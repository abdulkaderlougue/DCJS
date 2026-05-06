import { Link } from "react-router-dom";
import { courses } from "../../data/courses";
import CourseCard  from "../../components/CourseCard";
import { useState, useEffect } from "react";
import { Heading5 } from "lucide-react";
import Loading from "../../components/Loading";
import MyError from "../../components/MyError";

const API_BASE = import.meta.env.VITE_API_URL;

export default function CoursesPage() {
  const [cours,setCours] = useState([]);
  const [error, setError] = useState(null)
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async ()=> {

      try{
        const URL = `${API_BASE}/courses`;
        const res = await fetch(URL);

        if (!res.ok){
          throw new Error("Failed to fetch courses")
        }

        const data = await res.json();
        // console.log("data == ",data)
        const coursess = Array.isArray(data)? data:[]
        setCours(coursess)
      }catch (err){
        console.log(err)
        if (err.name === "TypeError") {
          setError("Impossible de joindre le serveur.");
        } else {
          setError("Erreur lors du chargement.");
        }

      }finally {
        setCoursesLoading(false)
      }
      
    }

    loadCourses()

  },[])

  if (error) return <MyError message={error} />

  if (coursesLoading) return <Loading message="Chargement des cours..."/>
  
  return (
    <div className="animate-fade-in space-y-4 pb-4">
      <h1 className="text-2xl font-bold text-foreground"> Tous les cours </h1>
      <div className="space-y-3">
        {!coursesLoading && cours.map((course) => ( 
          
          <Link key={course.id} to={`/courses/${course.id}`} className="block">
            <CourseCard key={course.id} course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}