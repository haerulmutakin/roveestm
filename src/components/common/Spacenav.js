import { Button, IconButton, Icon, ButtonToolbar, ButtonGroup } from 'rsuite';
const SpaceNav = ({projectData}) => {
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
                    <IconButton icon={<Icon icon="list-ul" />} ></IconButton>
                    <IconButton icon={<Icon icon="squares" />} ></IconButton>
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    )
}

export default SpaceNav;