import { useState } from "react";
import { Button, Icon } from "rsuite";
import firebaseDB from "_firebaseconn/firebase.config";
import { priorityList } from "assets/mock/priority";

const UpdateTask = ({taskData, onComplete}) => {
    const tasksDB = firebaseDB.firestore().collection('tasks');
    const [taskName, setTaskName] = useState(taskData?.name);
    const [priority, setPriority] = useState(taskData?.priority);

    const handleKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            updateTask();
        }
    }

    const handleFocus = (e) => {
        const value = e.target.value;
        e.target.selectionEnd = value.length;
    }

    const updateTask = () => {
        const payload = taskData;
        payload.name = taskName;
        payload.priority = priority;
        onComplete();
        tasksDB
            .doc(payload.id)
            .update(payload)
    }

    const handleTaskSubmit = () => {
        updateTask();
    }

    return (
        <div className="task-form-container">
            <textarea
                className="task-form"
                placeholder="Enter task name" 
                autoFocus
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}>
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
            <Button onClick={handleTaskSubmit} size="sm" color="blue" style={{margin: '10px'}}>Update task</Button>
        </div>
    )
}

export default UpdateTask;