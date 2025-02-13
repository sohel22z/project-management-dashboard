import React, { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../services/api';
import EditProjectModal from './EditProjectModal';

const ProjectList = ({ refresh }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('Refreshing project list...');
    setProjects(fetchProjects());
  }, [refresh]);

  const handleDelete = (id) => {
    console.log(`Deleting project with ID ${id}`);
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      setProjects(fetchProjects());
    }
  };

  const handleEdit = (project) => {
    console.log('Editing project:', project);
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2>Project Management Dashboard</h2>
      {projects.length === 0 ? (
        <p>No projects available. Add one!</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.due_date}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(project.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {showModal && <EditProjectModal show={showModal} onClose={() => setShowModal(false)} project={selectedProject} onProjectUpdated={() => setProjects(fetchProjects())} />}
    </div>
  );
};

export default ProjectList;