import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { courses } from "../../data/courses";
import AudioPlayer from "../../components/AudioPlayer";
import QuizCard from "../../components/QuizCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Circle, Radio, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/helpers";
import MyError from "../../components/MyError";
import Loading from "../../components/Loading";
import CategoryIcon from "../../components/CategoryIcon";

const API_BASE = import.meta.env.VITE_API_URL;

export default function CourseDetailPage() {
  const { course_id } = useParams(); // get the id from the url
  const navigate = useNavigate();
  const PATH_BACK = '/'; // path to go back
  // const course = courses.find((course) => course.id === course_id);
  const [error, setError] = useState(null)
  const [course, setCourse] = useState({

  }) 
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('lessons'); // lessons or quizzes
  const [activeLessonId, setActiveLessonId] = useState(0);
  const currentLesson = activeLessonId? course.lessons?.find((lesson) => lesson.id === activeLessonId):null;
  // const Icon = course? getIcon(course.categorie)[0]:getIcon("Default")[0]
  // const color = course? getIcon(course.categorie)[1]:getIcon("Default")[1]

  // compute progress
  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);

  const handleLessonClick = (lesson) => {
    // set active lesson
    if (lesson.lesson_type === "audio") {
      setActiveLessonId(lesson.id);
    };
    // console.log(lesson.audioUrl)

    // scroll up
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const onBack = () => {
    navigate(PATH_BACK);
  }

  useEffect(()=>{
    const getCourse = async ()=>{
      const url = `${API_BASE}/courses/${parseInt(course_id)}`;
      try{
        const res  = await fetch(url)
        if(!res.ok) throw new Error("Failed to load lessons")

        const data = await res.json()
        // console.log(data)
        // const lessonList = Array.isArray(data)? data: []
        setCourse(data)
      }catch (err){
        console.error(err);

         // distinguish network error vs server error
        if (err.name === "TypeError") {
          setError("Impossible de joindre le serveur.");
        } else {
          setError("Erreur lors du chargement.");
        }
      }finally{
        setLoading(false);
      }
      
    }

    getCourse()
  }, [])

if (loading) return <Loading message="Chargement du cours..." />

if (error) return <MyError message={error}/>

return course &&(
    <div className="animate-fade-in space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold text-foreground">{course.titre}</h1>
          <p className="text-xs text-muted-foreground">Animateur: {course.animateur}</p>
          {course.livre && (<p className="text-xs text-muted-foreground">Livre: {course.livre}</p>)}
          {course.auteur && (<p className="text-xs text-muted-foreground">Auteur: {course.auteur}</p>)}
        </div>
        {/* <span className="text-2xl">{<Icon color={color} />}</span> */}
        <span className="text-2xl">{<CategoryIcon category={course.categorie}/>}</span>
      </div>

      {/* Progress */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-card-foreground">{course.completedLessons}{course.lessons.length} leçon{course.lessons.length >1 ? "s":""}</span>
          {/* <span className="font-bold text-primary">{progress}%</span> */}
        </div>
        {/* <Progress value={progress} className="mt-2 h-1.5" /> */}
      </div>

      {/* Audio Player */}
      {currentLesson && currentLesson.lesson_type === "audio" && (
        <AudioPlayer
          lesson={currentLesson}
          // onComplete={() => setActiveLessonId(null)}
          // onComplete={() => currentLesson.completed=true}
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
          Leçons
        </button>

        {/* Quiz section if there is any quiz */}
        {/* {course.quizzes.length > 0 && (
          <button
            onClick={() => setTab("quizzes")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "quizzes" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
          >
            Quizzes ({course.quizzes.length})
          </button>
        )} */}
      </div>

      {/* Lessons List */}
      {tab === "lessons" && (
        <div className="space-y-2">
          {course && course.lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              // onClick={() => lesson.lesson_type === "audio" && setActiveLessonId(lesson.id)}
              onClick={() => handleLessonClick(lesson)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                activeLessonId === lesson.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30"
              }`}
              aria-label={`${lesson.titre} — ${lesson.completed ? "completed" : "not completed"}`}
            >

              {/* circle icon section */}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {/* check for completed lesson for checkmark */}
                {lesson.completed ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : lesson.lesson_type === "live" ? (
                  <Radio className="h-4 w-4 text-destructive" />
                ) : (
                  <>
                  <span>{idx + 1}</span>
                  {/* <input type="checkbox" name="" id="" onClick={() => lesson.completed =true}/> */}
                  </>
                )}
              </span>

              {/* Detail/lesson+duration section */}
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium ${lesson.completed ? "text-muted-foreground" : "text-card-foreground"}`}>
                  {lesson.titre}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {lesson.lesson_type === "live" ? (
                    <><Radio className="h-3 w-3 text-destructive" /> Live Lecture</>
                  ) : (
                    <><Headphones className="h-3 w-3" /> {formatTime(lesson.duration)}</>
                  )}
                </p>
                {lesson.chapitre && <p className="text-xs text-muted-foreground flex items-center gap-1">Chapitre: {lesson.chapitre }</p>}
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