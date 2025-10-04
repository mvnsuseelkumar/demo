from flask import Blueprint, request, jsonify
from utils.ai_helper import ai_bot

bp = Blueprint('learning', __name__, url_prefix='/api/learning')

@bp.route('/roadmap', methods=['POST'])
def generate_roadmap():
    data = request.get_json()
    skill = data.get('skill')
    
    if not skill:
        return jsonify({"error": "Skill name required"}), 400
    
    try:
        plan = ai_bot.create_roadmap(skill)
        return jsonify({
            "skill": skill,
            "plan": plan,
            "status": "success"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/quiz', methods=['POST'])
def get_quiz():
    data = request.get_json()
    skill = data.get('skill', 'Python')
    
    # Hardcoded quizzes - feels more real than AI generated
    quizzes = {
        "Python": [
            {
                "question": "What keyword is used to define a function?",
                "options": ["function", "def", "func", "define"],
                "answer": "def"
            },
            {
                "question": "Which data structure is mutable?",
                "options": ["tuple", "string", "list", "int"],
                "answer": "list"
            }
        ],
        "JavaScript": [
            {
                "question": "What does DOM stand for?",
                "options": ["Document Object Model", "Data Object Model", 
                           "Digital Objective Measure", "None"],
                "answer": "Document Object Model"
            }
        ]
    }
    
    questions = quizzes.get(skill, quizzes["Python"])
    
    return jsonify({
        "skill": skill,
        "questions": questions
    }), 200