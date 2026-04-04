import { Link } from "react-router-dom";
import { courses } from "../../data/courses";
import CourseCard  from "../../components/CourseCard";

export default function CoursesPage() {
  return (
    <div>
      <h1>Courses</h1>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          {/* <Link to={`/course/${course.id}`} className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/40 hover:glow-gold">View Course</Link> */}
          <CourseCard course={course}/>
        </div>
      ))}

    </div>
  );
}