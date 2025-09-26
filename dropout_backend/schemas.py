from pydantic import BaseModel
from datetime import datetime

class StudentData(BaseModel):
    gpa: float
    attendance: float
    assignments_submitted: int
    participation_score: float

class PredictionResponse(BaseModel):
    dropout_risk: float
    advice: str

class PredictionLogOut(BaseModel):
    id: int
    gpa: float
    attendance: float
    assignments_submitted: int
    participation_score: float
    dropout_risk: float
    advice: str
    counselor_action: str
    timestamp: datetime

    class Config:
        orm_mode = True

class CounselorUpdate(BaseModel):
    counselor_action: str
