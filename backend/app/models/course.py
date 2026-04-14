from datetime import datetime
from typing import Optional
from sqlalchemy.ext.orderinglist import ordering_list
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.core.database import Base
from app.models.lesson import Lesson
# class Base:
#     pass
class Course(Base): # cour 
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    titre: Mapped[str] = mapped_column(String, index=True)
    titre_ar: Mapped[str] = mapped_column(String) # titre en arabe
    description: Mapped[str] = mapped_column(Text)
    animateur: Mapped[str] = mapped_column(String)
    livre: Mapped[str] = mapped_column(String) # titre du livre associé au cours, s'il y en a un
    auteur: Mapped[str] = mapped_column(String)
    categorie: Mapped[str] = mapped_column(String) # catégorie du cours, fiqh, hadith, quran etc.
    total_lessons: Mapped[int] = mapped_column(Integer, default=0) # nombre total de leçons dans le cours, mis à jour automatiquement à chaque ajout/suppression de leçon
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now()) # date de création du cours

    # relation avec les leçons, un cours peut avoir plusieurs leçons
    lessons: Mapped[Optional[list["Lesson"]]] = relationship("Lesson", back_populates="course", 
                                                        order_by="Lesson.order_index", # trier les leçons par ordre d'index pour les récupérer dans le bon ordre, et éviter d'avoir à faire du tri côté client
                                                        cascade="all, delete-orphan", # supprimer les leçons associées si le cours est supprimé, et supprimer les leçons orphelines qui n'ont plus de cours associé
                                                        collection_class=ordering_list("order_index", count_from=1)) # ordonner automatiquement les leçons en fonction de leur index dans la liste