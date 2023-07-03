import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import { Image, ImageListItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image: { webformatURL, largeImageURL, tags } }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ImageListItem>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal url={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </ImageListItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
