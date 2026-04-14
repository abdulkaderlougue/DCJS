from datetime import datetime
from app.crud import courses
from app.schemas.course import CourseCreate, CourseResponse, CourseUpdate
from fastapi import APIRouter, Depends, HTTPException
from app.core.database import get_db

router = APIRouter()

# db = next(get_db()) # get a database session for the CRUD operations
@router.get("/", response_model=list[CourseResponse])
def get_courses(db = Depends(get_db)):
    """Endpoint pour récupérer la liste de tous les cours"""
    courses_list = courses.get_courses(db)

    return courses_list
   

@router.get("/{course_id}", response_model=CourseResponse)
def get_course_by_id(course_id: int, db = Depends(get_db)):
    """Endpoint pour récupérer les détails d'un cours spécifique"""
    try: 
        course = courses.get_course_by_id(db, course_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    return course

@router.post("/", response_model=CourseResponse)
def create_course(course_data: CourseCreate, db = Depends(get_db)):
    """Endpoint pour créer un nouveau cours"""
    try:
        course = courses.create_course(db, course_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return course

@router.put("/{course_id}", response_model=CourseResponse)
def update_course(course_id: int, course_data: CourseUpdate, db = Depends(get_db)):
    """Endpoint pour mettre à jour un cours existant"""
    try:
        course = courses.update_course(db, course_id, course_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return course

@router.delete("/{course_id}", response_model=CourseResponse)
def delete_course(course_id: int, db = Depends(get_db)):
    """Endpoint pour supprimer un cours"""
    try:
        course = courses.delete_course(db, course_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return course