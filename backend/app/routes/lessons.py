from fastapi import APIRouter, Depends, HTTPException
from app.core.database import get_db
from app.crud import lessons
from app.schemas.lesson import LessonCreate, LessonResponse, LessonUpdate


router = APIRouter()


@router.get("/", response_model=list[LessonResponse])
def get_lessons(db = Depends(get_db)):
    """Endpoint pour récupérer la liste de toutes les leçons"""
    return lessons.get_lessons(db)

@router.get("/course/{course_id}", response_model=list[LessonResponse])
def get_lessons_by_course_id(course_id: int, db = Depends(get_db)):
    """Endpoint pour récupérer la liste de toutes les leçons d'un cours spécifique"""
    try:
        lessons_list = lessons.get_lessons_by_course_id(db, course_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    return lessons_list

@router.get("/{lesson_id}", response_model=LessonResponse)
def get_lesson_by_id(lesson_id: int, db = Depends(get_db)):
    """Endpoint pour récupérer les détails d'une leçon spécifique"""
    try:
        lesson = lessons.get_lesson_by_id(db, lesson_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    return lesson

@router.post("/", response_model=LessonResponse)
def create_lesson(lesson_data: LessonCreate, db = Depends(get_db)):
    """Endpoint pour créer une nouvelle leçon"""
    try:
        lesson = create_lesson(db, lesson_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return lesson

@router.put("/{lesson_id}", response_model=LessonResponse)
def update_lesson(lesson_id: int, lesson_data: LessonUpdate, db = Depends(get_db)):
    """Endpoint pour mettre à jour une leçon existante"""
    try:
        updated_lesson = lessons.update_lesson(db, lesson_data, lesson_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return updated_lesson

@router.delete("/{lesson_id}", response_model=LessonResponse)
def delete_lesson(lesson_id: int, db = Depends(get_db)):
    """Endpoint pour supprimer une leçon"""
    try:
        deleted_lesson = lessons.delete_lesson(db, lesson_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return deleted_lesson