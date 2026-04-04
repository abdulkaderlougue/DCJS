import { useParams } from "react-router-dom";
import { useState } from "react";
import { courses } from "../../data/courses";
import AudioPlayer from "../../components/AudioPlayer";

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  const [currentLesson, setCurrentLesson] = useState(
    course.lessons[0]
  );

  return (
    <div>
      <h1>{course.title}</h1>

      <h2>Lessons</h2>
      {course.lessons.map((lesson) => (
        <div key={lesson.id}>
          <button onClick={() => setCurrentLesson(lesson)}>
            {lesson.title}
          </button>
        </div>
      ))}

      <h2>Now Playing: {currentLesson.title}</h2>
      <AudioPlayer src={currentLesson.audioUrl} />
    </div>
  );
}