import { Link } from 'react-router-dom';
const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/40 hover:glow-gold"
      aria-label={`${course.title} - ${course.lessonsCount} lessons`}
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="text-3xl" role="img" aria-hidden="true">{course.icon}</span>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {course.category}
        </span>
      </div>
      <h3 className="mb-1 font-heading text-sm font-semibold leading-tight text-foreground group-hover:text-accent transition-colors">
        {course.title}
      </h3>
      <p className="mb-3 text-xs text-muted-foreground line-clamp-2">{course.description}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
        {/* <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.lessonsCount} lessons</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span> */}
      </div>
      {course.progress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          {/* <Progress value={course.progress} className="h-1.5" /> */}
        </div>
      )}
    </Link>
  );
};

export default CourseCard;