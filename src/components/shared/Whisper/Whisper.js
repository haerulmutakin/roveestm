import './Whisper.scss';

const Whisper = ({children, backdrop = false, onHide}) => {
    const outerClass = backdrop ? 'backdrop' : '';
    return (
        <div className="rov-whisper">
            <div className="whisper-inner">{children}</div>
            <div className={"whisper-outer " + outerClass} onClick={onHide}></div>
        </div>
    )
}


export default Whisper;