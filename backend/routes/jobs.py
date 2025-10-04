from flask import Blueprint, request, jsonify
from utils.job_matcher import rank_jobs, calculate_match

bp = Blueprint('jobs', __name__, url_prefix='/api/jobs')

# Mock job database - in real app this comes from Firestore
SAMPLE_JOBS = [
    {
        "job_id": "j001",
        "title": "Frontend Developer",
        "company": "TechCorp",
        "skills_required": ["React", "JavaScript", "CSS"],
        "location": "Remote",
        "link": "https://example.com/job1"
    },
    {
        "job_id": "j002",
        "title": "Data Analyst",
        "company": "DataHub",
        "skills_required": ["Python", "SQL", "Excel"],
        "location": "New York",
        "link": "https://example.com/job2"
    }
]

@bp.route('/match', methods=['POST'])
def match_jobs():
    data = request.get_json()
    
    user_profile = {
        'skills': data.get('skills', []),
        'interests': data.get('interests', [])
    }
    
    # Rank all jobs
    matched_jobs = rank_jobs(user_profile, SAMPLE_JOBS)
    
    return jsonify({
        "jobs": matched_jobs,
        "total": len(matched_jobs)
    }), 200

@bp.route('/single-match', methods=['POST'])
def single_job_match():
    data = request.get_json()
    
    user_skills = data.get('user_skills', [])
    job_skills = data.get('job_skills', [])
    
    score, missing = calculate_match(user_skills, job_skills)
    
    return jsonify({
        "match_score": score,
        "missing_skills": missing
    }), 200