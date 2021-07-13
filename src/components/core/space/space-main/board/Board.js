/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Whisper, Tooltip, Icon } from "rsuite";
import firebaseDB from "_firebaseconn/firebase.config";
import Task from "../../../Task";
import Whispering from "components/shared/Whisper/Whisper";
import NewTask from "../../../NewTask";
import NewBoard from "../../../NewBoard";

const Board = ({boardData}) => {
    const tasksDB = firebaseDB.firestore().collection('tasks');
    const [board, setBoard] = useState(boardData);
    const [taskwhisper, setTaskwhisper] = useState(false);
    const [boardWhisper, setBoardwhisper] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTask(boardData);
    }, []);

    const getTask = (board) => {
        tasksDB
            .where('boardId', '==', board.id)
            .orderBy('createdAt', 'asc')
            .onSnapshot(response => {
                const data = [];
                response.forEach(element => {
                    data.push(element.data());
                });
                setTasks(data);
            })
    }

    useEffect(() => {
        setBoard(boardData);
    }, [boardData]);

    return (
        <div className="rov-board whisper-container">
            {boardWhisper && 
                <Whispering backdrop onHide={() => setBoardwhisper(false)}>
                    <NewBoard boardData={boardData} onComplete={() => setBoardwhisper(false)} />
                </Whispering>
            }
            <div style={{borderColor: boardData?.boardColor}} className="board-header" onClick={() => setBoardwhisper(true)}>
                <label className="title">{board.title}</label>
                {boardData?.allowNewTask &&
                    <Whisper placement="left" trigger="hover" speaker={ <Tooltip>Add new task</Tooltip>}>
                    <div onClick={() => setTaskwhisper(true)} className="add-task">
                        <Icon icon={'data-increase'} />
                    </div>
                    </Whisper>
                }
            </div>
            <div className="board-content">
                {tasks.map((item, index) => {
                    return <Task key={index} taskData={item} />
                })}
                {boardData?.allowNewTask &&
                    <div className="new-task whisper-container">
                        <Whisper placement="right" trigger="hover" speaker={<Tooltip>Add new task</Tooltip>}>
                            <div onClick={() => setTaskwhisper(true)} className="add-icon"><Icon icon="data-increase" /> Add task</div>
                        </Whisper>
                        {taskwhisper && 
                            <Whispering onHide={() => setTaskwhisper(false)}>
                                <NewTask boardData={boardData} />
                            </Whispering>
                        }
                    </div>
                }
                </div>
            </div>
    )
}

export default Board;