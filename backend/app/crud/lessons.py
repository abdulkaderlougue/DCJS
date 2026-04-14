from app.core.database import get_db
from app.models.lesson import Lesson
from app.models.course import Course
from app.schemas.lesson import LessonCreate, LessonUpdate
from sqlalchemy.orm import Session

def create_lesson(db, lesson_data: LessonCreate):
    """ Créer une nouvelle leçon dans la base de données """

    # Get the course to which the lesson belongs
    course = db.query(Course).filter(Course.id == lesson_data.course_id).first()
    if not course:
        raise ValueError(f"Le cours avec l'ID {lesson_data.course_id} n'existe pas")
    
    # Creer la leçon 
    lesson = Lesson(**lesson_data.model_dump()) # unpack les données de la leçon à partir du Pydantic model

    # ajouter la leçon à la liste des leçons du cours, pour automatiquement creer l'ordre des lecons
    course.lessons.append(lesson) 

    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson

def get_lessons(db):
    """ Récupérer la liste de toutes les leçons """
    # return db.select(Lesson).all()
    return db.query(Lesson).all()

def get_lesson_by_id(db, lesson_id: int):
    """ Récupérer une leçon par son ID """
    # return db.select(Lesson).where(Lesson.id == lesson_id).first()
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise ValueError(f"Leçon avec l'ID {lesson_id} n'existe pas")
    return lesson

def get_lessons_by_course_id(db, course_id: int):
    """ Récupérer la liste de toutes les leçons d'un cours spécifique """
    # return db.select(Lesson).where(Lesson.course_id == course_id).all()
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise ValueError(f"Le cours avec l'ID {course_id} n'existe pas")
    
    lessons = db.query(Lesson).filter(Lesson.course_id == course_id).all()

    return lessons

def update_lesson(db, update_data: LessonUpdate, lesson_id: int):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise ValueError(f"Leçon avec l'ID {lesson_id} n'existe pas")
    
    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(lesson, key, value)
    
    try:
        db.commit()
        db.refresh(lesson)
    except Exception as e:
        db.rollback()
        raise e
    return lesson

def delete_lesson(db, lesson_id):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()

    if not lesson:
        raise ValueError(f"Leçon avec l'ID {lesson_id} n'existe pas")
    
    try:
        db.delete(lesson)
        db.commit()
    except Exception as e:
        raise e
    
    return lesson


   