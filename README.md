# AI Career Companion

This project is a web application designed to be an AI-powered career assistant. It consists of a Python Flask backend and a React frontend.

## Project Structure

- `/frontend`: Contains the React application.
- `/backend`: Contains the Python Flask API.

## Prerequisites

- Python 3.8+ and `pip`
- Node.js and `npm`

## Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    # For Unix or MacOS
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install Python dependencies:**
    The required packages are `flask`, `flask-cors`, `transformers`, and `torch`.
    ```bash
    pip install flask flask-cors transformers torch
    ```
    *(Note: For a production setup, these dependencies should be managed in a `requirements.txt` file.)*

4.  **Run the backend server:**
    ```bash
    python app.py
    ```
    The backend server will start on `http://localhost:5000`.

## Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Node.js dependencies:**
    This will install all the necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend development server will start, typically on `http://localhost:5173`. Open this URL in your browser to see the application.

## Running the Full Application

To use the application, you must have both the backend and frontend servers running at the same time. Open two separate terminal windows or tabs, and run the respective start commands in each directory.