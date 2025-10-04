import os
from pathlib import Path

class Config:
    # Basic settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-this'
    DEBUG = True
    
    # AI Model settings - using smaller model for speed
    MODEL_NAME = "google/flan-t5-base"  # Works well on most laptops
    MAX_LENGTH = 512
    TEMPERATURE = 0.7
    
    # Firebase stuff (if needed)
    FIREBASE_CREDS = os.environ.get('FIREBASE_CREDS')
    
    # Paths
    BASE_DIR = Path(__file__).parent
    DATA_DIR = BASE_DIR / 'data'