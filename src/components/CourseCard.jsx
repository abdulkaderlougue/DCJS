import { Link } from 'react-router-dom';
// import { Course } from "@/data/courses";
import { Progress } from "@/components/ui/progress";

// interface CourseCardProps {
//   course: Course;
//   onClick: (courseId: string) => void;
// }

// const CourseCard = ({ course, onClick }: CourseCardProps) => {
const CourseCard = ({ course }) => {
  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);

  return (
    <button
      className="group flex w-full items-start gap-4 rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label={`${course.title} — ${progress}% complete`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
        {course.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate font-semibold text-card-foreground">{course.title}</h3>
          <span className="shrink-0 font-arabic text-sm text-muted-foreground">{course.titleAr}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{course.instructor} · {course.totalLessons} lessons</p>
        <div className="mt-2 flex items-center gap-2">
          <Progress value={progress} className="h-1.5 flex-1" aria-label={`${progress}% complete`} />
          <span className="text-xs font-medium text-primary">{progress}%</span>
        </div>
      </div>
    </button>
  );
};

export default CourseCard;
