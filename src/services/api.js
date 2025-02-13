const STORAGE_KEY = 'projects';

export const fetchProjects = () => {
  console.log('Fetching projects from LocalStorage...');
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addProject = (project) => {
  console.log('Adding project:', project);
  const projects = fetchProjects();
  project.id = Date.now();
  projects.push(project);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return project;
};

export const updateProject = (id, updatedData) => {
  console.log(`Updating project with ID ${id}`, updatedData);
  let projects = fetchProjects();
  projects = projects.map((project) =>
    project.id === id ? { ...project, ...updatedData } : project
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const deleteProject = (id) => {
  console.log(`Deleting project with ID ${id}`);
  let projects = fetchProjects();
  projects = projects.filter((project) => project.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};