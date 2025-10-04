from flask import Blueprint, request, jsonify
from utils.ai_helper import ai_bot

bp = Blueprint('chat', __name__, url_prefix='/api/chat')

@bp.route('/', methods=['POST'])
def chat_with_ai():
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({"error": "Need a message to respond to"}), 400
    
    user_message = data['message']
    
    # Get AI response
    try:
        response = ai_bot.get_response(user_message)
        return jsonify({
            "reply": response,
            "status": "success"
        }), 200
    except Exception as e:
        print(f"Error in chat: {str(e)}")
        return jsonify({
            "error": "AI had trouble responding",
            "status": "error"
        }), 500

@bp.route('/suggest-careers', methods=['POST'])
def suggest_careers():
    data = request.get_json()
    skills = data.get('skills', [])

    if not skills:
        return jsonify({"error": "Skills are required to suggest careers."}), 400
    
    prompt = f"Based on these skills: {', '.join(skills)}, suggest 3 suitable career paths."
    
    try:
        suggestions = ai_bot.get_response(prompt)
        return jsonify({
            "suggestions": suggestions,
            "status": "success"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500