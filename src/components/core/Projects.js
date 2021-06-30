import { useEffect, useState } from "react";
import { ButtonGroup, ButtonToolbar, Icon, IconButton } from "rsuite";
import firebaseDB from '_firebaseconn/firebase.config';

const Projects = ({history}) => {
    const projectsDB = firebaseDB.firestore().collection('projects');
    const [projects, setProjects] = useState([]);
    const [pinnedProjects, setPinnedProjects] = useState([]);

    useEffect(() => {
        getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProjects = () => {
        projectsDB
            .onSnapshot(response => {
                const data = [];
                const pinnedData = [];
                response.forEach(element => {
                    const item = element.data();
                    if (item.pinned) {
                        pinnedData.push(item);
                    }
                    data.push(element.data());
                });
                setProjects(data);
                setPinnedProjects(pinnedData);
            })
    }

    const handleProjectPinned = (project) => {
        project.pinned = !project.pinned;
        updateProject(project);
    }

    const updateProject = (project) => {
        projectsDB
            .doc(project.id)
            .update(project)
            .catch(err => {
                console.log(err);
            })
    }

    const handleProjectClick = (project) => {
        console.log(project);
        history.push('/space/' + project.id);
    }
    return (
        <div className="rov-projects">
            <div className="projects-group">
                <div className="group-title">
                    <Icon icon="bookmark" /> Pinned projects
                </div>
                <div className="group-content">
                    {pinnedProjects.map((item, index) => {
                        return  <div key={index} onClick={() => handleProjectClick(item)} className="project-item">
                            {item.title}
                            <div className="bookmark-icon">
                                <div onClick={() => handleProjectPinned(item)}>
                                    <Icon icon={item.pinned ? 'bookmark' : 'bookmark-o'}/>
                                </div>
                            </div>
                            <div className="action">
                                <ButtonToolbar>
                                    <ButtonGroup>
                                        <IconButton size="xs" icon={<Icon icon="pencil" />} />
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="projects-group">
                <div className="group-title">
                    <Icon icon="bookmark" /> Your projects
                </div>
                <div className="group-content">
                    {projects.map((item, index) => {
                        return  <div key={index} onClick={() => handleProjectClick(item)} className="project-item">
                            {item.title}
                            <div className="bookmark-icon">
                                <div onClick={() => handleProjectPinned(item)}>
                                    <Icon icon={item.pinned ? 'bookmark' : 'bookmark-o'}/>
                                </div>
                            </div>
                            <div className="action">
                                <ButtonToolbar>
                                    <ButtonGroup>
                                        <IconButton size="xs" icon={<Icon icon="pencil" />} />
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="projects-group">
                <div className="group-title">
                    <Icon icon="bookmark" /> Invited projects
                </div>
                <div className="group-content">
                </div>
            </div>
        </div>
    )
}

export default Projects;