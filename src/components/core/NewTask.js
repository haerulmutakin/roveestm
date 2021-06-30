import { useContext, useState } from 'react';
import { Icon, Button } from 'rsuite';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '_provider/AuthProvider';
import firebaseDB from "_firebaseconn/firebase.config";
import { priorityList } from 'assets/mock/priority';

const NewTask = ({boardData}) => {

    const currentUser = useContext(AuthContext);
    const tasksDB = firebaseDB.firestore().collection('tasks');
    const [newsTaskValue, setNewTaskValue] = useState('');
    const [priority, setPriority] = useState(-1);

    const handleKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            addTask();
            setNewTaskValue('');
            setPriority(-1);
        }
    }

    const addTask = () => {
        const payload = {
            id: uuidv4(),
            name: newsTaskValue,
            priority: priority,
            boardId: boardData.id,
            userId: currentUser.uid,
            createdAt: firebaseDB.firestore.FieldValue.serverTimestamp()
        }
        tasksDB
            .doc(payload.id)
            .set(payload)
    }

    const handleTaskSubmit = () => {
        addTask();
    }
    return (
        <div className="task-form-container">
            <textarea
                className="task-form"
                placeholder="Enter task name" 
                autoFocus
                value={newsTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
                onKeyDown={handleKeyDown}>
            </textarea>
            <div className="priority">
                <label>Priority</label>
                <div className="priority-list">
                    {priorityList.map((item, index) => {
                        return <div key={index} className="item" onClick={() => setPriority(index)}>
                            <div className="left">
                                <Icon style={{color: item.color}} icon="flag"/> {item.name}
                            </div>
                            {priority === index &&
                                <div>
                                    <Icon icon="check"/>
                                </div>
                            }
                        </div>
                    })}
                    <div className="item" onClick={() => setPriority(-1)}>
                        <div className="left">
                            <Icon icon="close"/> Clear
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={handleTaskSubmit} size="sm" color="blue" style={{margin: '10px'}}>Add task</Button>
        </div>
    )
}

export default NewTask;