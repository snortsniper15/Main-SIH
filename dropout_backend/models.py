from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from database import Base

class PredictionLog(Base):
    __tablename__ = "prediction_logs"

    id = Column(Integer, primary_key=True, index=True)
    gpa = Column(Float)
    attendance = Column(Float)
    assignments_submitted = Column(Integer)
    participation_score = Column(Float)
    dropout_risk = Column(Float)
    advice = Column(String)
    counselor_action = Column(String, default="None")
    timestamp = Column(DateTime, default=datetime.utcnow)
