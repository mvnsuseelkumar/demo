import React, { useState } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder job data
  const jobListings = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Solutions Inc.', location: 'Remote' },
    { id: 2, title: 'Backend Engineer', company: 'Data Systems Co.', location: 'New York, NY' },
    { id: 3, title: 'UX/UI Designer', company: 'Creative Minds LLC', location: 'San Francisco, CA' },
    { id: 4, title: 'Product Manager', company: 'Innovate Today', location: 'Austin, TX' },
  ];

  const filteredJobs = jobListings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobs-container">
      <header className="jobs-header">
        <h1>Find Your Next Opportunity</h1>
        <p>Search for jobs that match your skills and interests.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="job-listings">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company-name">{job.company}</p>
              <p className="location">{job.location}</p>
              <button className="apply-button">View Details</button>
            </div>
          ))
        ) : (
          <p>No jobs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;