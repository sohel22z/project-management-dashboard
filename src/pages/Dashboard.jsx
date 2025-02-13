import { useState } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <ProjectForm onProjectAdded={() => setRefresh(!refresh)} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <ProjectList key={refresh} />
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;