def calculate_match(user_skills, job_requirements):
    """
    Simple but effective skill matching
    Returns match percentage and what's missing
    """
    # Clean up the inputs
    user_set = set([s.lower().strip() for s in user_skills])
    job_set = set([s.lower().strip() for s in job_requirements])
    
    # Find matches
    matched = user_set.intersection(job_set)
    missing = job_set - user_set
    
    # Calculate score
    if len(job_set) == 0:
        return 0, []
    
    match_score = (len(matched) / len(job_set)) * 100
    
    return round(match_score, 1), list(missing)

def rank_jobs(user_profile, job_list):
    """
    Sorts jobs by how well they match user skills
    """
    user_skills = user_profile.get('skills', [])
    
    results = []
    for job in job_list:
        score, missing = calculate_match(
            user_skills, 
            job.get('skills_required', [])
        )
        
        results.append({
            'job_id': job.get('job_id'),
            'title': job.get('title'),
            'company': job.get('company'),
            'location': job.get('location'),
            'match_score': score,
            'missing_skills': missing,
            'link': job.get('link', '#')
        })
    
    # Sort by match score descending
    results.sort(key=lambda x: x['match_score'], reverse=True)
    
    return results