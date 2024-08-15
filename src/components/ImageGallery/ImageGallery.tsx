import ImageCard from "../ImageCard/ImageCard"
import { Photo } from "../../types";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
    items: Photo[],
    openModal: (url: Photo) => void
}

const ImageGallery: React.FC<ImageGalleryProps> = ({items, openModal}) => { 
    
    return (
        <ul className={css.galleryUl}>
            {items.map(item => {
                return <li key={item.id} className={css.galleryLi}>
                    <ImageCard item={item} openModal={openModal}/>
                </li>
            })}
        </ul>
    );
}

export default ImageGallery;