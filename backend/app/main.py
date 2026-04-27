from fastapi import FastAPI
from app.core.database import Base, engine
from app.routes import courses, lessons, auth
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(courses.router, prefix="/courses", tags=["Cours"])
app.include_router(lessons.router, prefix="/lessons", tags=["Leçons"])

@app.get('/')
def welcome():
    return {"message": "Bienvenue Sur le API de DCJS"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", port=9000)

