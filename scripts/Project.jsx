import * as React from 'react';
import {
  Button, ButtonGroup, Badge, Image, DropdownButton, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import CreateSource from './CreateSource';
import Socket from './Socket';
import { Logout } from './LogoutButton';

export default function Project() {
  const [projectName, setProjectName] = React.useState('');

  function getProject() {
    React.useEffect(() => {
      Socket.emit('request_selected_project');
      Socket.on('give_project_name', (data) => {
        console.log(data.project_name);
        setProjectName(data.project_name);
        console.log(`project name is ${projectName}`);
      });
    }, []);
  }

  function projectSelected() {
    if (projectName === '' || projectName === null) {
      return false;
    }
    return true;
  }

  function renderProject() {
    if (projectSelected()) {
      return (<CreateSource usingProject={projectName} />);
    }
    return (
      <div>
        <span className="d-flex justify-content-center">
          A project is not selected, please select a project from the Dashboard.
        </span>
      </div>
    );
  }

  getProject();

  return (
    <div className="Project">
      <div display="flex" flex="0 0 auto" align="center">

        <span className="h1" position="absolute" left="0">
          Project
          <Badge className="badge-primary">{projectName}</Badge>
        </span>
        <DropdownButton
          id="dropdown-basic-button"
          title={
            <Image src="static/profile-blank.jpg" className="rounded-circle border" width="50px" height="50px" />
        }
        />
        <Logout />

      </div>
      <br />
      <div className="d-flex justify-content-center">
        <ButtonGroup aria-label="Basic example">
          <Link to="/">
            <Button className="btn-outline-primary">Landing</Button>
          </Link>
          <Link to="/home">
            <Button className="btn-outline-primary">Dashboard</Button>
          </Link>
          <Link to="/project">
            <Button className="btn-outline-primary">Project</Button>
          </Link>
        </ButtonGroup>
        <br />
      </div>
      {renderProject()}
    </div>
  );
}
