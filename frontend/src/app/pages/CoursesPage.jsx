import { Link } from "react-router-dom";
import { courses } from "../../data/courses";
import CourseCard  from "../../components/CourseCard";

export default function CoursesPage() {

  return (
    <div className="animate-fade-in space-y-4 pb-4">
      <h1 className="text-2xl font-bold text-foreground"> Tous les cours </h1>

      <div className="space-y-3">
        {courses.map((course) => ( 
          <Link key={course.id} to={`/courses/${course.id}`} className="block">
            <CourseCard key={course.id} course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}