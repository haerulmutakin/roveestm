import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Icon, Whisper, Tooltip } from "rsuite";
import firebaseDB from "_firebaseconn/firebase.config";
import Whispering from "components/shared/Whisper/Whisper";
import Board from "./Board";
import SpaceNav from "components/common/Spacenav";
import NewBoard from "./NewBoard";

const Space = () => {
    const urlParams = useParams();
    const boardDB = firebaseDB.firestore().collection('boards');
    const [ showTaskForm, setShowTaskForm ] = useState(false);
    const [ boards, setBoards ] = useState([]);
    const [ projectDetail, setProjectDetail ] = useState({});


    useEffect(() => {
        firebaseDB.firestore().collection('projects').doc(urlParams.projectId).get()
            .then(res => {
                setProjectDetail(res.data());
            });
    }, [urlParams])

    useEffect(() => {
        getBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams]);

    const getBoards = () => {
        boardDB 
            .where('projectId', '==', urlParams.projectId)
            .orderBy('createdAt', 'asc')
            .onSnapshot(response => {
                const data = [];
                response.forEach(item => {
                    data.push(item.data())
                });
                setBoards(data);
            })
    }

    return (
        <React.Fragment>
            <SpaceNav projectData={projectDetail} />
            <div className="rov-space-container">
                <div className="rov-space">
                    {boards.map((item, index) => {
                        return <Board key={index} boardData={item}/>
                    })}
                    <div className="whisper-container">
                        <Whisper placement="bottom" trigger="hover" speaker={<Tooltip>Add new board</Tooltip>}>
                            <div className="rov-add-space" onClick={() => setShowTaskForm(true)}>
                                <div><Icon icon="data-increase" /> Add board</div>
                            </div>
                        </Whisper>

                        {showTaskForm &&  
                            <Whispering backdrop onHide={() => setShowTaskForm(false)}>
                                <NewBoard onComplete={() => setShowTaskForm(false)} />
                            </Whispering>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Space;