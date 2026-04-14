from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

from app.schemas.lesson import LessonResponse

class CourseBase(BaseModel):
    titre: str
    titre_ar: Optional[str]
    description: str
    animateur: str
    livre: Optional[str]
    auteur: Optional[str]
    categorie: str
    lessons: Optional[list[LessonResponse]] = [] # liste des leçons du cours, incluse dans la réponse du cours pour éviter de faire des requêtes séparées pour récupérer les leçons d'un cours


class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    titre: Optional[str] = None
    titre_ar: Optional[str] = None
    description: Optional[str] = None
    animateur: Optional[str] = None
    livre: Optional[str] = None
    auteur: Optional[str] = None
    categorie: Optional[str] = None


class CourseResponse(CourseBase):
    id: int
    total_lessons: int
    lessons: Optional[list["LessonResponse"]]
    created_at: datetime

    # lire les données à partir d'objets SQLAlchemy, pas seulement des dicts
    model_config = ConfigDict(from_attributes=True) 