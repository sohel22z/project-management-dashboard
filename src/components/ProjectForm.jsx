import { useState } from 'react';
import { addProject } from '../services/api';

const ProjectForm = ({ onProjectAdded }) => {

  const [name, setName] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name.trim()) {
      alert('project name can not be empthy')
      return;
    }

    const newProject = {name, status, due_date: dueDate};
    addProject(newProject);
    onProjectAdded();
    setName('')
    setDueDate('')
  }

  return (
    <div className="container mt-4">
      <h4>Add New Project</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;