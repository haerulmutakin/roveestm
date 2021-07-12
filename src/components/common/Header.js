import { ButtonToolbar, Dropdown, Icon, IconButton } from "rsuite";

const Header = ({projectData, onNewProject, history}) => {

    const handleProjectSelect = (event) => {
        history.push('/space/' + event.id);
    }

    const handleBrandClick = () => {
        history.push('/');
        document.title = 'Rovees TM';
    }
    return (
        <div className="rov-header">
            <div className="rov-brand" onClick={handleBrandClick}>Rovees TM</div>
            <div className="rov-nav">
                <div className="nav-left">
                    <ButtonToolbar>
                        <Dropdown onSelect={handleProjectSelect} title="Projects" icon={<Icon icon="squares" />} placement="bottomStart" appearance="default">
                            {projectData.map((item, index) => {
                                return <Dropdown.Item eventKey={item} key={index}>{item.title}</Dropdown.Item>
                            })}
                        </Dropdown>
                        <IconButton icon={<Icon icon="plus" />} onClick={onNewProject} />
                    </ButtonToolbar>
                </div>
                <div className="nav-right">
                <ButtonToolbar>
                    <IconButton icon={<Icon icon="bell" />} />
                    <Dropdown title="Haerul" placement="bottomEnd" appearance="default">
                        <Dropdown.Item>Haerul Mutakin</Dropdown.Item>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>Setting</Dropdown.Item>
                        <Dropdown.Item>Logout</Dropdown.Item>
                    </Dropdown>
                </ButtonToolbar>
                </div>
            </div>
        </div>
    )
}

export default Header;