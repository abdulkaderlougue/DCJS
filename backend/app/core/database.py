from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os 
from dotenv import load_dotenv

load_dotenv()

db_name = os.getenv('DB_NAME')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_user = os.getenv('DB_USER')
db_pass = os.getenv('DB_PASS')

DATABASE_URL = f'postgresql+psycopg2://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}'

engine = create_engine(
    DATABASE_URL, 
    # connect_args={"check_same_thread": False} # only for SQLite, allows multiple threads to access the database
    )


try:
    with engine.connect() as conn:
        print("Connection to db Successful!")
        
except Exception as e:
    print(f'Connection failed, {e}')
    raise e
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