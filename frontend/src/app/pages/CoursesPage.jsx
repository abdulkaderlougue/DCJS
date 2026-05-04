import { Link } from "react-router-dom";
import { courses } from "../../data/courses";
import CourseCard  from "../../components/CourseCard";
import { useState, useEffect } from "react";
import { Heading5 } from "lucide-react";
const URL = "http://127.0.0.1:9000/courses"
export default function CoursesPage() {
  const [cours,setCours] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async ()=> {

      const res = await fetch(URL);
      try{

        if (!res.ok){
          throw new Error("Failed ")
        }

        const data = await res.json();
        console.log("data == ",data)
        const coursess = Array.isArray(data)? data:[]
        setCours(coursess)
      }catch (err){
        console.log(err)
      }finally {
        setCoursesLoading(false)
      }
      
    }

    loadCourses()

  },[])


  return (
    <div className="animate-fade-in space-y-4 pb-4">
      <h1 className="text-2xl font-bold text-foreground"> Tous les cours </h1>
      {coursesLoading && (<h5> Course loading </h5>)}
      <div className="space-y-3">
        {cours.map((course) => ( 
          <Link key={course.id} to={`/courses/${course.id}`} className="block">
            <CourseCard key={course.id} course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}