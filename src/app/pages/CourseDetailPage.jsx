import { useParams } from "react-router-dom";
import { useState } from "react";
import { courses } from "../../data/courses";
import AudioPlayer from "../../components/AudioPlayer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Circle, Radio, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseDetailPage() {
  const { id } = useParams(); // get the id from the url
  const navigate = useNavigate();
  const PATH_BACK = '/'; // path to go back
  const course = courses.find((course) => course.id === id);
  const [tab, setTab] = useState('lessons'); // lessons or quizzes
  const [activeLesson, setActiveLesson] = useState(null);
  const currentLesson = course.lessons.find((lesson) => lesson.id === activeLesson);
  // console.log(currentLesson)

  // compute progress
  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);

  const handleLessonClick = (lesson) => {
    // set active lesson
    if (lesson.type === "audio") setActiveLesson(lesson.id);

    // scroll up
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const onBack = () => {
    navigate(PATH_BACK);
  }


return (
    <div className="animate-fade-in space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold text-foreground">{course.title}</h1>
          <p className="text-xs text-muted-foreground">Animateur: {course.instructor}</p>
          <p className="text-xs text-muted-foreground">Livre: {course.book}</p>
          <p className="text-xs text-muted-foreground">Auteur: {course.author}</p>
        </div>
        <span className="text-2xl">{course.icon}</span>
      </div>

      {/* Progress */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-card-foreground">{course.completedLessons}/{course.totalLessons} lessons</span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="mt-2 h-1.5" />
      </div>

      {/* Audio Player */}
      {currentLesson && currentLesson.type === "audio" && (
        <AudioPlayer
          lesson={currentLesson}
          // onComplete={() => setActiveLesson(null)}
        />
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setTab("lessons")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "lessons" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
        >
          Lessons
        </button>

        {/* Quiz section if there is any quiz */}
        {course.quizzes.length > 0 && (
          <button
            onClick={() => setTab("quizzes")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "quizzes" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
          >
            Quizzes ({course.quizzes.length})
          </button>
        )}
      </div>

      {/* Lessons List */}
      {tab === "lessons" && (
        <div className="space-y-2">
          {course.lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              // onClick={() => lesson.type === "audio" && setActiveLesson(lesson.id)}
              onClick={() => handleLessonClick(lesson)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                activeLesson === lesson.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30"
              }`}
              aria-label={`${lesson.title} — ${lesson.completed ? "completed" : "not completed"}`}
            >

              {/* circle icon section */}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {/* check for completed lesson for checkmark */}
                {lesson.completed ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : lesson.type === "live" ? (
                  <Radio className="h-4 w-4 text-destructive" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </span>

              {/* Detail/lesson+duration section */}
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium ${lesson.completed ? "text-muted-foreground" : "text-card-foreground"}`}>
                  {lesson.title}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {lesson.type === "live" ? (
                    <><Radio className="h-3 w-3 text-destructive" /> Live Lecture</>
                  ) : (
                    <><Headphones className="h-3 w-3" /> {lesson.duration}</>
                  )}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">Chapitre: {lesson.chapter }</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Quizzes */}
      {/* {tab === "quizzes" && (
        <div className="space-y-4">
          {course.quizzes.map((quiz, i) => (
            <QuizCard key={quiz.id} quiz={quiz} index={i} />
          ))}
        </div>
      )} */}
    </div>
  );
}