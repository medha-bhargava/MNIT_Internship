import React, { useEffect, useState } from 'react';
import './Projects.css';
import Navbar from '../Navbar/Navbar';
import Dropdown from '../Dropdown/Dropdown'; // Reuse your existing dropdown!

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/projects/all');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const filterByStatus = (status) =>
    projects.filter((proj) => proj.status?.toLowerCase() === status.toLowerCase());

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };
  return (
    <>
      <Navbar />
      <div className="projects-page">
        <h1>Projects</h1>
        <div className="projects">
          <Dropdown title="Ongoing Projects">
            {filterByStatus("Ongoing").map((project, index) => (
              <div className="project-entry" key={index}>
                <p>
                  <strong>{project.projectTitle}</strong>, {project.projectType}, {project.projectLevel}
                  <br />
                  <em>{formatDate(project.dateFrom)} - {formatDate(project.dateTo)}</em>
                </p>
                <p>
                  <strong>Role:</strong> {project.role} | <strong>Funding Agency:</strong> {project.fundingAgency}
                </p>
                <p>
                  <strong>Amount:</strong> Rs. {project.amount} Lacs | <strong>ERP ID:</strong> {project.erpId}
                </p>
                {project.coInvestigators?.length > 0 && (
                  <p><strong>Co-Investigators:</strong> {project.coInvestigators.join(', ')}</p>
                )}
              </div>
            ))}
          </Dropdown>

          <Dropdown title="Completed Projects">
            {filterByStatus("Completed").map((project, index) => (
              <div className="project-entry" key={index}>
                <p>
                  <strong>{project.projectTitle}</strong>, {project.projectType}, {project.projectLevel}
                  <br />
                  <em>{formatDate(project.dateFrom)} - {formatDate(project.dateTo)}</em>
                </p>
                <p>
                  <strong>Role:</strong> {project.role} | <strong>Funding Agency:</strong> {project.fundingAgency}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{project.amount} Lacs | <strong>ERP ID:</strong> {project.erpId}
                </p>
                {project.coInvestigators?.length > 0 && (
                  <p><strong>Co-Investigators:</strong> {project.coInvestigators.join(', ')}</p>
                )}
              </div>
            ))}
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default Projects;

// import React, { useEffect, useState } from 'react';
// import './Projects.css';
// import Navbar from '../Navbar/Navbar';

// function Projects() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch('http://localhost:8083/api/projects/all');
//         const data = await response.json();
//         console.log("Fetched projects:", data);
//         setProjects(data);
//       } catch (err) {
//         console.error('Error fetching projects:', err);
//       }
//     };

//     fetchProjects();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="projects-page">
//         <h1>Projects</h1>
//         <div className="projects-list">
//           {projects.length === 0 ? (
//             <p>No projects found.</p>
//           ) : (
//             projects.map((project, index) => (
//               <div className="project-card" key={index}>
//                 <h3>{project.projectTitle}</h3>
//                 <p><strong>Role:</strong> {project.role}</p>
//                 <p><strong>Level:</strong> {project.projectLevel}</p>
//                 <p><strong>Type:</strong> {project.projectType}</p>
//                 <p><strong>Funding Agency:</strong> {project.fundingAgency}</p>
//                 <p><strong>Duration:</strong> {project.dateFrom} to {project.dateTo}</p>
//                 <p><strong>Amount (in Lacs):</strong> {project.amount}</p>
//                 <p><strong>Status:</strong> {project.status}</p>
//                 <p><strong>ERP Project ID:</strong> {project.erpId}</p>
//                 {project.coInvestigators?.length > 0 && (
//                   <p><strong>Co-Investigators:</strong> {project.coInvestigators.join(', ')}</p>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Projects;
