import "./JobCard.css";

function JobCard({ job }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "#48bb78";
    if (score >= 60) return "#ed8936";
    return "#f56565";
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <div
          className="match-badge"
          style={{ background: getScoreColor(job.match_score) }}
        >
          {job.match_score}% Match
        </div>
      </div>

      <p className="company">
        {job.company} • {job.location}
      </p>

      {job.missing_skills && job.missing_skills.length > 0 && (
        <div className="missing-skills">
          <p className="label">Skills to learn:</p>
          <div className="skill-tags">
            {job.missing_skills.map((skill, idx) => (
              <span key={idx} className="skill-tag missing">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <a
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        View Job
      </a>
    </div>
  );
}

export default JobCard;
