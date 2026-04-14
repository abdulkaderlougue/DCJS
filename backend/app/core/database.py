from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, DeclarativeBase


DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} # only for SQLite, allows multiple threads to access the database
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base() # for SQLAlchemy 1.x
class Base(DeclarativeBase): # for SQLAlchemy 2.x
    pass

def get_db():
    # every request, create a session and close the connection after the request is done
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()