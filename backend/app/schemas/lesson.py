from pydantic import BaseModel, ConfigDict
from typing import Optional

class LessonBase(BaseModel):
    course_id: int
    chapitre: str
    titre: str
    description: str | None = None
    duration: int
    audio_url: str
    lesson_type: str
    # order_index: int

class LessonCreate(LessonBase):
    pass

class LessonUpdate(BaseModel):
    course_id: Optional[int] = None
    chapitre: Optional[str] = None
    titre: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    audio_url: Optional[str] = None
    lesson_type: Optional[str] = None

class LessonResponse(LessonBase):
    id: int
    course_id: int
    order_index: int
    
  
    model_config = ConfigDict(from_attributes=True) # read data from objects, not just dicts
