import { useState } from "react";
import "./RoadmapCard.css";

function RoadmapCard({ roadmap }) {
  const [completed, setCompleted] = useState([]);

  const toggleWeek = (weekNum) => {
    if (completed.includes(weekNum)) {
      setCompleted(completed.filter((w) => w !== weekNum));
    } else {
      setCompleted([...completed, weekNum]);
    }
  };

  return (
    <div className="roadmap-card">
      <h3>{roadmap.skill} Learning Path</h3>

      <div className="weeks-container">
        {roadmap.plan.map((week, idx) => (
          <div
            key={idx}
            className={`week-item ${
              completed.includes(week.week) ? "completed" : ""
            }`}
          >
            <div className="week-header">
              <h4>Week {week.week}</h4>
              <input
                type="checkbox"
                checked={completed.includes(week.week)}
                onChange={() => toggleWeek(week.week)}
              />
            </div>
            <p className="topics">{week.topics}</p>
            {week.hours && <p className="hours">⏱ {week.hours}</p>}
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(completed.length / roadmap.plan.length) * 100}%`,
          }}
        />
      </div>
      <p className="progress-text">
        {completed.length} of {roadmap.plan.length} weeks completed
      </p>
    </div>
  );
}

export default RoadmapCard;
