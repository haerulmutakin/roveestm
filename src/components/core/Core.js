import { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Modal, Button, ButtonToolbar } from 'rsuite';
import Header from "components/common/Header";
import Projects from "./projects/Projects";
import Space from "./space/Space";
import { AuthContext } from '_provider/AuthProvider';
import firebaseDB from '_firebaseconn/firebase.config';
import { v4 as uuidv4 } from 'uuid';

const Core = ({history}) => {
    const currentUser = useContext(AuthContext);
    const projectsDB = firebaseDB.firestore().collection('projects');
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [newProjectTitle, setNewProjectTitle] = useState('');

    useEffect(() => {
        getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProjects = () => {
        projectsDB
            .where('userId', '==', currentUser.uid)
            .onSnapshot(response => {
                const data = [];
                response.forEach(element => {
                    data.push(element.data());
                });
                setProjects(data);
            })
    }

    const handleProjectKeydown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            handleSaveProject();
        }
    }

    const handleSaveProject = () => {
        const payload = {
            id: uuidv4(),
            title: newProjectTitle,
            userId: currentUser.uid,
            pinned: false,
            createdAt: firebaseDB.firestore.FieldValue.serverTimestamp()
        }

        saveProject(payload);
    }

    const saveProject = (payload) => {
        projectsDB
            .doc(payload.id)
            .set(payload)
            .then(() => {
                setShowModal(false);
                setNewProjectTitle('');
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div>
            <Header history={history} projectData={projects} onNewProject={() => setShowModal(true)} />
            <Route exact path="/">
                <Redirect to="/projects" />
            </Route>
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/space/:projectId">
                <Space />
            </Route>
            <Modal show={showModal} size="xs" onHide={() => setShowModal(false)}>
                <input 
                    autoFocus
                    className="new-project-form"
                    type="text" 
                    placeholder="Enter project title"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    onKeyDown={handleProjectKeydown}
                />
                <ButtonToolbar>
                    <Button color="red" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button color="blue" size="sm" onClick={handleSaveProject}>Save</Button>
                </ButtonToolbar>
            </Modal>
        </div>
    )
}

export default Core;