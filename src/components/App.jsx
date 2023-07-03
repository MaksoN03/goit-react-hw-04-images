import { fetchImages } from 'fetchImages';
import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import SearchBar from './SearchBar';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const prevSearchText = useRef(searchText);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      setStatus('pending');

      const abortController = new AbortController();
      const fetchData = async () => {
        await fetchImages(searchText, page, { signal: abortController.signal })
          .then(({ totalHits, hits: images }) => {
            if (prevSearchText.current !== searchText) {
              const totalPages = Math.ceil(totalHits / 12);
              setImages(images);
              setTotalPages(totalPages);
              setStatus('resolved');
              prevSearchText.current = searchText;
              return;
            }

            setImages(prevImages => [...prevImages, ...images]);
            setStatus('resolved');
          })
          .catch(error => {
            setError(error.message);
            setStatus('rejected');
          });
      };
      fetchData();

      return () => {
        abortController.abort();
      };
    }
  }, [prevSearchText, searchText, page]);

  const onSubmit = searchText => {
    if (!searchText.trim()) {
      toast.error('Incorrect request');
      return;
    }

    if (searchText === prevSearchText.current) {
      toast.error('Same request. Please, enter another one');
      return;
    }

    setSearchText(searchText);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={onSubmit} />

      {status === 'rejected' && <p>{error}</p>}

      <ImageGallery images={images} />

      {status === 'pending' && <Loader />}

      {totalPages > 1 && page < totalPages && <Button onClick={onLoadMore} />}

      <ToastContainer />
    </Container>
  );
};
