from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from typing import Optional
from pydantic import AnyHttpUrl 
from app.core.database import get_db
from app.crud import lessons, courses
from app.schemas.lesson import LessonType, LessonCreate, LessonResponse, LessonUpdate, StorageProvider
from app.utils.supabase_utils import upload_file
from app.utils.cloudflare_utils import upload_file_cloudflare
import os
from dotenv import load_dotenv

router = APIRouter()

load_dotenv()

STORAGE_PROVIDER=os.getenv("STORAGE_PROVIDER")

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
async def create_lesson(
    file: Optional[UploadFile] = File(None),
    course_id: int = Form(...),
    chapitre: str = Form(""), # not required
    titre: str = Form(...),
    description: str = Form(""),
    duration: int = Form(description="La duree en seconde"),  # I should calculate in the backend
    lesson_type: LessonType = Form(), # audio or live
    db = Depends(get_db),
    live_url: AnyHttpUrl = Form(None, description="Pour un cour en live, doit commencer avec https://")
    ):
    """Endpoint pour créer une nouvelle leçon
    duration: la duree de l'audio ou le live
    """
    # taille maximale du fichier en Mo
    MAX_FILE_MB = 50
    MAX_FILE_SIZE = MAX_FILE_MB * 1024 * 1024  # en octets

    # Check for file if the lesson type is not live
    if lesson_type.lower() != LessonType.live and file is None:
        # 
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Un fichier est obligatoire pour les lecons du type {lesson_type}.")
    
    # needs http url for live events
    if lesson_type == LessonType.live and live_url is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
        detail="Le lien est obligatoire pour les cours en live")
    else:
        url = live_url

    try:
        if lesson_type != LessonType.live:
            # valider le type de fichier
            if not file.content_type.startswith("audio/"):
                raise HTTPException(
                    status_code=400,
                    detail="Type de fichier invalid. Selectionnez un fichier audio"
                )
            
            file_bytes = await file.read() # lire le fichier

            # valider la taille du fichier
            if len(file_bytes) > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=413,
                    detail=f"Le fichier est trop volumineux. La taille maximale autorisée est de {MAX_FILE_MB} Mo."
                )
            
            
            file_name = "_".join(file.filename.split(" "))
            course = courses.get_course_by_id(db, course_id)
            course_name = ("_".join(course.titre.split(" "))).lower()
            instructor = ("_".join(course.animateur.split(" "))).lower()
            file_storage_path = f"{course_name}/{instructor}/{file_name}"
            print(file_storage_path)
            # Téléverser le fichier de la leçon et obtenir l'URL publique 
            if STORAGE_PROVIDER == StorageProvider.supabase:
                # use supabase to store
                res = upload_file(file_bytes, file_storage_path, file.content_type)
            else:
                res = upload_file_cloudflare(file.file, file_storage_path, file.content_type)
            print(f"Lesson file uploaded successfully")
            
            url = res['url']

        lesson_data = {
            "course_id": course_id,
            "chapitre": chapitre,
            "titre": titre,
            "description": description,
            "duration": duration,
            "lesson_type": lesson_type,
            "audio_url": url
        }
        # convert the dict object to pyddantic format to be parsed easily 
        pydantic_lesson_data = LessonCreate(**lesson_data)
        lesson = lessons.create_lesson(db, pydantic_lesson_data)
        print(f"Lesson created successfully with id {lesson.id}")
    except Exception as e:
        print(str(e))
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

# @router.post("/upload")
# async def upload_lesson(course_name: str, file: UploadFile = File(...)):
#     """Endpoint pour téléverser un fichier de leçon"""
#     MAX_FILE_MB = 20
#     MAX_FILE_SIZE = MAX_FILE_MB * 1024 * 1024  # en octets
#     try:
#         file_bytes = await file.read()
#         print(f"{course_name}/{file.filename}", file.content_type, len(file_bytes)/(1024*1024), "MB")
#         # Vérifier la taille du fichier
#         if len(file_bytes) > MAX_FILE_SIZE:
#             raise HTTPException(
#                 status_code=413,
#                 detail=f"Le fichier est trop volumineux. La taille maximale autorisée est de {MAX_FILE_MB} Mo."
#             )

#         # Call the upload_file function from supabase_utils
#         upload_response = "" #upload_file(file_bytes,file.filename, course_name, file.content_type)

#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
    
#     return upload_response