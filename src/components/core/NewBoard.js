import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Button, Checkbox, Icon, Alert } from "rsuite";
import firebaseDB from "_firebaseconn/firebase.config";
import { AuthContext } from "_provider/AuthProvider";
import { BoardColor } from "assets/mock/boardColor";

const NewBoard = ({onComplete}) => {
    const currentUser = useContext(AuthContext);
    const urlParams = useParams();
    const boardDB = firebaseDB.firestore().collection('boards');
    const [boardTitle, setBoardName] = useState('');
    const [allowNewTask, setAllowNewTask] = useState(true);
    const [editable, setEditable] = useState(true);
    const [boardColor, setBoardColor] = useState(BoardColor[0]);

    const handleInputKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            if (!boardNamevalid()) return;
            addBoard();
            onComplete();
        }
    }

    const boardNamevalid = () => {
        let valid = true
        if (boardTitle.length > 20) {
            Alert.error('Board name is too long');
            valid = false;
        }
        if (boardTitle === '') {
            Alert.error('Board name cannot be empty');
            valid = false;
        }

        return valid;
    }

    const handleBoardSubmit = () => {
        if (!boardNamevalid()) return;
        addBoard();
        onComplete();
    }

    const addBoard = () => {

        const newBoard = {
            id: uuidv4(),
            title: boardTitle,
            allowNewTask: allowNewTask,
            editable: editable,
            boardColor: boardColor,
            userId: currentUser.uid,
            projectId: urlParams?.projectId,
            createdAt: firebaseDB.firestore.FieldValue.serverTimestamp()
        }
        boardDB
            .doc(newBoard.id)
            .set(newBoard)
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="new-board-container">
            <div className="new-board-form">
                <input
                    autoFocus
                    value={boardTitle}
                    onChange={(e) => setBoardName(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    />
            </div>
            <div className="new-board-property">
                <div className="board-color-list">
                    {BoardColor.map(item => {
                        return <div 
                                key={item} 
                                className={`color-item ${boardColor === item ? 'selected' : ''}`}
                                onClick={() => setBoardColor(item)} 
                                style={{backgroundColor: item}}>
                                    {boardColor === item && <Icon icon="check" />}
                            </div>
                    })}
                </div>
                <div className="optional">
                    <Checkbox defaultChecked onChange={(value, checked, event) => setAllowNewTask(checked)} >Allow new task</Checkbox>
                    <Checkbox defaultChecked onChange={(value, checked, event) => setEditable(checked)} >Task editable</Checkbox>
                </div>
                <Button onClick={handleBoardSubmit} color="blue" size="sm">Add board</Button>
            </div>
        </div>
    )
}

export default NewBoard;