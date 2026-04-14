from fastapi import FastAPI
from app.core.database import Base, engine
from app.routes import courses, lessons

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(courses.router, prefix="/courses", tags=["Cours"])
app.include_router(lessons.router, prefix="/lessons", tags=["Leçons"])

@app.get('/')
def welcome():
    return {"message": "Bienvenue Sur le API de DCJS"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)

