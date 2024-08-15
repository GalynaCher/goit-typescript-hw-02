import { Photo } from "../../types";
import css from "./ImageModal.module.css";
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface ImageModalProps {
    isOpen: boolean,
    onRequestClose: (event: React.MouseEvent | React.KeyboardEvent) => void,
    photo: Photo
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, photo }) => {
    //  photo? console.log("ImageModal photo", photo) : "";
    return (   
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Photo Modal"
            className={css.modal}
            overlayClassName={css.overlay}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={500}
            onAfterOpen={() => console.log('Modal is open')}
            onAfterClose={() => console.log('Modal is closed')}
        >
        {photo && (
            <>
            <img src={photo.urls.regular} alt={photo.description} className={css.modalImage} />
            </>
        )}
        </Modal>
    )
 }

export default ImageModal;