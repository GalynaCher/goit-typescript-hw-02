import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchPhotos } from "./unsplash-photos-api";
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import { Photo } from '../types';
import css from "./App.module.css";

function App() {

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchCriteria, setSearchCriteria] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(99);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo|null>(null);

  const handleSearch = async (newSearchCriteria: string) => {
    setPhotos([]);
    setPage(1);
    setTotalPages(0);
    setSearchCriteria(newSearchCriteria);
    // console.log("App: handleSearch page", page);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    // console.log("App: handleLoadMore page", page);
  }

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    if (searchCriteria === "") {
      return;
    }
    async function getPhotos() { 
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotos(searchCriteria, page);
        const results: Photo[] = data.results;
        setTotalPages(data.total_pages);
        // console.log("App: getPhotos() totalPages", totalPages);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...results];
        });
      } catch (error: unknown) {
        setError(true);
        console.error(error);
        toast.error("Error photo loading!");
      } finally {
      setLoading(false);
      }
    }
    getPhotos();
  }, [page, searchCriteria])

  return (
    <>
      <SearchBar onSearch={handleSearch} getTotalPages={totalPages } /> 
      {photos.length > 0 && <ImageGallery items={photos} openModal={openModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage/>}
      {photos.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {page >= totalPages && totalPages !== 0 &&
        <div className={css.endMsgDiv}>
          <p className={css.endMsgP}>You reached the end of search results</p>
        </div>}
      {selectedPhoto !== null &&
          <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} photo={selectedPhoto} />}
      <Toaster position='bottom-right'/>
    </>
  )
}

export default App
