from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# My custom modules
from routes import chat, jobs, learning
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Let frontend talk to us
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

# Register blueprints - keeps things organized
app.register_blueprint(chat.bp)
app.register_blueprint(jobs.bp)
app.register_blueprint(learning.bp)

@app.route('/health', methods=['GET'])
def health_check():
    return {"status": "running", "message": "Backend is alive!"}, 200

@app.errorhandler(404)
def not_found(error):
    return {"error": "Endpoint not found"}, 404

@app.errorhandler(500)
def server_error(error):
    return {"error": "Something went wrong on our end"}, 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)