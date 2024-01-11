import "../PhotoGalery.css";
import React, { useState } from "react";

interface PhotoProps {
  number: number;
}

const PhotoGalery: React.FC<PhotoProps> = (photoNumber) => {
  const initialShowedPhoto = "";

  const [open, setOpen] = useState(false);
  const [showedPhoto, setShowedPhoto] = useState(initialShowedPhoto);
  const [author, setAuthor] = useState();

  const newArr = Array.from(Array(photoNumber.number).keys());

  const photoUrlArray = newArr.map((i) => {
    return {
      photoUrl: `https://picsum.photos/id/${i * 10 + 2}/200.jpg`,
      photoInfoUrl: `https://picsum.photos/id/${i * 10 + 2}/info`,
    };
  });

  const handleClick = (item: React.MouseEvent<HTMLImageElement> | any): any => {
    setOpen(true);
    fetch(`${item}`)
      .then((response) => response.json())
      .then((data) => {
        setShowedPhoto(data.download_url);
        setAuthor(data.author);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container1">
      <div className="grid-component">
        {photoUrlArray.map((item: any) => {
          return (
            <img
              src={item.photoUrl}
              onClick={() => handleClick(item.photoInfoUrl)}
            />
          );
        })}
      </div>
      {open ? (
        <div className="popup-image">
          <span className="close" onClick={() => setOpen(false)}>
            &times;
          </span>
          <img src={showedPhoto} />
          <p className="author">{author}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PhotoGalery;
