import React from 'react';
import './Learning.css';

const Learning = () => {
  // Placeholder learning data
  const learningModules = [
    { id: 1, title: 'Advanced JavaScript', category: 'Web Development', duration: '8 hours' },
    { id: 2, title: 'Python for Data Science', category: 'Data Science', duration: '12 hours' },
    { id: 3, title: 'UI/UX Design Principles', category: 'Design', duration: '6 hours' },
    { id: 4, title: 'Introduction to Machine Learning', category: 'AI', duration: '15 hours' },
  ];

  return (
    <div className="learning-container">
      <header className="learning-header">
        <h1>Your Personalized Learning Path</h1>
        <p>Enhance your skills with these recommended courses and modules.</p>
      </header>

      <div className="learning-modules">
        {learningModules.map(module => (
          <div key={module.id} className="module-card">
            <div className="module-category">{module.category}</div>
            <h3>{module.title}</h3>
            <p className="module-duration">Est. duration: {module.duration}</p>
            <button className="start-learning-button">Start Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;