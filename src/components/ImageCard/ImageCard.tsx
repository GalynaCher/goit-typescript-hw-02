import { Photo } from "../../types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
    item: Photo,
    openModal: (url: Photo) => void
}

 const ImageCard: React.FC<ImageCardProps> = ({ item, openModal }) => {

    // console.log(item);

    return (
        <div className={css.divImage} onClick={() => openModal(item)}>
            <img className={css.cardImage} src={item.urls.small} alt={item.alt_description}/>
        </div>
    )
 }

export default ImageCard;