import Modal from '@material-ui/core/Modal';

const AlertModal = ({isVisible, onClose, title, message})=>{
    return(
        <Modal
            open={isVisible}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={{
                position: 'absolute',
                width: 400,
                backgroundColor: '#ff0f0f',
                top: '38%',
                left: '36%',
                borderRadius: '10px'
                
            }}>
                <h2 id="simple-modal-title" style={{textAlign:'center'}}>{title}</h2>
                <p id="simple-modal-description" style={{textAlign:'center'}}>
                    {message}
                </p>
            </div>
        </Modal>
    )
}

export default AlertModal;