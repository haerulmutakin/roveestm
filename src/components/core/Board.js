/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Whisper, Tooltip, Icon } from "rsuite";
import firebaseDB from "_firebaseconn/firebase.config";
import Task from "./Task";
import Whispering from "components/shared/Whisper/Whisper";
import NewTask from "./NewTask";

const Board = ({boardData}) => {
    const boardDB = firebaseDB.firestore().collection('boards');
    const tasksDB = firebaseDB.firestore().collection('tasks');
    const [board, setBoard] = useState(boardData);
    const [whisper, setWhisper] = useState(false);
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

    const handleInputFocus = (e) => {
        const value = e.target.value;
        e.target.selectionEnd = value.length;
    }

    const handleInputKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            if (e.target.value.length > 20) {
                Alert.error('Board name is too long');
                return;
            }
            e.target.blur()
          }
    }

    const handleInputBlur = (e) => {
        e.preventDefault();
        const value = e.target.value;
        if (value === '' || value === boardData.title) {
            setBoard(prev => ({
                ...prev,
                title: boardData.title
            }));
            return;
        }
        updateBoard(board);
    }

    const updateBoard = (board) => {
        boardDB
            .doc(board.id)
            .update(board)
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="rov-board">
            <div style={{borderColor: boardData?.boardColor}} className="board-header">
                <input  
                    type="text" 
                    className="title" 
                    value={board.title}
                    onFocus={handleInputFocus}  
                    onChange={(e) => setBoard(prev => ({...prev, title: e.target.value}))}
                    onKeyDown={handleInputKeyDown}
                    onBlur={handleInputBlur}
                />
                {boardData?.allowNewTask &&
                    <Whisper placement="left" trigger="hover" speaker={ <Tooltip>Add new task</Tooltip>}>
                    <div onClick={() => setWhisper(true)} className="add-task">
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
                            <div onClick={() => setWhisper(true)} className="add-icon"><Icon icon="data-increase" /> Add task</div>
                        </Whisper>
                        {whisper && 
                            <Whispering onHide={() => setWhisper(false)}>
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