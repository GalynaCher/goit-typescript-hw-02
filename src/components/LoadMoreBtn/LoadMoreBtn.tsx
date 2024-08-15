import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
    onClick: () => void
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({onClick}) => {
    
    return (
        <div className={css.loadMoreDiv}>
            <button onClick={onClick} className={css.loadMoreButton}>Load more</button>
        </div>
    )
}

export default LoadMoreBtn;