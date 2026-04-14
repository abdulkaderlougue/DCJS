from app.models.course import Course
from app.schemas.course import CourseCreate, CourseResponse, CourseUpdate

def create_course(db, course_data: CourseCreate):
    """ Creer un nouveau cours dans la base de données """
    course = Course(**course_data.model_dump()) # unpack les données du cours à partir du Pydantic model
    try:
        db.add(course)
        db.commit()
        db.refresh(course)
    except Exception as e:
        db.rollback()
        raise e
    return course

def get_courses(db):
    """ Récupérer la liste de tous les cours """
    courses = db.query(Course).all()
    return courses

def get_course_by_id(db, course_id):
    """ Récupérer un cours par son ID """
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise Exception("Invalide ID, Cours non trouvé")
    return course

def update_course(db, course_id, course_data: CourseUpdate):
    """ Mettre à jour un cours existant, retourne le cours mis à jour """
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise Exception("Cours non trouvé")
    
    for key, value in course_data.model_dump(exclude_unset=True).items():
        setattr(course, key, value) # met à jour les attributs du cours avec les nouvelles données
    
    try:
        
        db.commit()
        db.refresh(course)
    except Exception as e:
        db.rollback()
        raise e
    return course

def delete_course(db, course_id):
    """ Suprimer un cours de la base de données, retourne le cours supprimé """
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise Exception("Cours non trouvé")
    
    try:
        db.delete(course)
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    return course


