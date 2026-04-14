from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.core.database import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    course_id: Mapped[int] = mapped_column(Integer, ForeignKey("courses.id")) # clé étrangère vers le cours auquel appartient la leçon
    titre: Mapped[str] = mapped_column(String, index=True)
    chapitre: Mapped[str | None] = mapped_column(String) # chapitre du cours auquel appartient la leçon, s'il y en a un
    description: Mapped[str | None] = mapped_column(Text)
    audio_url: Mapped[str] = mapped_column(String) # URL de l'audio de la leçon
    duration: Mapped[int] = mapped_column(Integer) # durée de la leçon en secondes
    lesson_type: Mapped[str] = mapped_column(String) # type de la leçon (live, audio)
    order_index: Mapped[int] = mapped_column(Integer, index=True) # ordre de la leçon dans le cours
    
    course = relationship("Course", back_populates="lessons") # relation avec le cours, une leçon appartient à un seul cours