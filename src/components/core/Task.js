import { useEffect, useState } from 'react';
import { Icon, IconButton } from 'rsuite';
import { priorityList } from 'assets/mock/priority';
import Whispering from 'components/shared/Whisper/Whisper';
import UpdateTask from './UpdateTask';

const Task = ({taskData}) => {
    const [task, setTask] = useState(taskData);
    const [overlay, setOverlay] = useState(false);
    useEffect(() => {
        setTask(taskData);
    }, [taskData]);
    return (
        <div className="rov-task">
            <div className="task-detail">
                {task.name}
                {task?.priority > -1 &&
                    <div className="task-info">
                    <Icon style={{color: priorityList[task?.priority]['color']}} icon="flag" />
                    </div>
                }
                <div className="task-edit-action">
                    <IconButton onClick={() => setOverlay(true)} size="xs" icon={<Icon icon="pencil" />} />
                </div>
            </div>
            {overlay && 
                <Whispering onHide={() => setOverlay(false)}>
                    <UpdateTask taskData={taskData}  onComplete={() => setOverlay(false)} />
                </Whispering>
            }
        </div>
    )
}

export default Task;