from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import pickle
import numpy as np
from database import SessionLocal, engine, Base
import models, schemas
from fastapi.responses import JSONResponse
from mangum import Mangum

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Vercel"}

# Required for Vercel
handler = Mangum(app)

# Create tables
Base.metadata.create_all(bind=engine)

# Load dummy ML model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI(title="Dropout Prediction API with DB")

# CORS for React frontend
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001"
]

@app.get("/favicon.ico")
async def favicon():
    return JSONResponse(content=None, status_code=204)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home_page():
    return {"message": "Welcome to the Dropout Prediction API 🚀"}

@app.post("/predict", response_model=schemas.PredictionResponse)
def predict(data: schemas.StudentData, db: Session = Depends(get_db)):
    features = np.array([[data.gpa, data.attendance, data.assignments_submitted, data.participation_score]])
    probability = model.predict_proba(features)[0][1]
    advice = "Needs counseling" if probability > 0.5 else "Low risk"

    log = models.PredictionLog(
        gpa=data.gpa,
        attendance=data.attendance,
        assignments_submitted=data.assignments_submitted,
        participation_score=data.participation_score,
        dropout_risk=float(probability),
        advice=advice
    )
    db.add(log)
    db.commit()
    db.refresh(log)

    return {"dropout_risk": round(float(probability), 3), "advice": advice}

@app.get("/logs", response_model=list[schemas.PredictionLogOut])
def get_logs(db: Session = Depends(get_db)):
    return db.query(models.PredictionLog).all()

@app.put("/logs/{log_id}", response_model=schemas.PredictionLogOut)
def update_counselor_action(log_id: int, update: schemas.CounselorUpdate, db: Session = Depends(get_db)):
    log = db.query(models.PredictionLog).filter(models.PredictionLog.id == log_id).first()
    if not log:
        return {"error": "Log not found"}
    log.counselor_action = update.counselor_action
    db.commit()
    db.refresh(log)
    return log
