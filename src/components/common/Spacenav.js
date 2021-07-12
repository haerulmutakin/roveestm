import { useState } from 'react';
import { Button, IconButton, Icon, ButtonToolbar, ButtonGroup } from 'rsuite';
const SpaceNav = ({projectData, onViewModeChange}) => {
    const [viewMode, setViewMode] = useState('board');

    const handleViewClick = (view) => {
        if (view !== viewMode) {
            setViewMode(prev => prev === 'board'? 'list' : 'board');
            onViewModeChange(view)
        }
    }
    return (
        <div className="rov-space-nav">
            <ButtonToolbar>
                <ButtonGroup>
                    <Button>{projectData.title}</Button>
                    <IconButton icon={<Icon icon="cog" />} />
                </ButtonGroup>
                <IconButton icon={<Icon icon="avatar" />} circle />
                <IconButton icon={<Icon icon="avatar" />} circle />
                <IconButton icon={<Icon icon="avatar" />} circle />
                <IconButton icon={<Icon icon="avatar" />} circle />
                <Button><Icon icon="plus" /> Invite</Button>
            </ButtonToolbar>
            <ButtonToolbar>
                <ButtonGroup>
                    <IconButton onClick={() => handleViewClick('list')} active={viewMode === 'list'} icon={<Icon icon="list-ul" />} ></IconButton>
                    <IconButton onClick={() => handleViewClick('board')} active={viewMode === 'board'} icon={<Icon icon="squares" />} ></IconButton>
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    )
}

export default SpaceNav;