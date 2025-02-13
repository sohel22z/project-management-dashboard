import React, { useState, useEffect } from 'react';
import { updateProject } from '../services/api';

const EditProjectModal = ({ show, onClose, project, onProjectUpdated }) => {
  const [formData, setFormData] = useState({ name: '', status: '', due_date: '' });

  useEffect(() => {
    if (project) {
      setFormData({ name: project.name, status: project.status, due_date: project.due_date });
    }
  }, [project]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating project:', formData);
    updateProject(project.id, formData);
    onProjectUpdated();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Project</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Project Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-control" name="due_date" value={formData.due_date} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;