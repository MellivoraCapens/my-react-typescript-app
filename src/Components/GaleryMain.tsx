import PhotoGalery from "./PhotoGalery";
import React, { useState } from "react";

const GaleryMain: React.FC = () => {
  const initialPhotoNumber = { number: 0 };

  const [photoNumber, setPhotoNumber] = useState(initialPhotoNumber);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetNumber = +e.target.value;
    setPhotoNumber((prevData) => ({
      ...prevData,
      number: targetNumber,
    }));
  };
  return (
    <div>
      <input
        className="number-input"
        type="number"
        max={25}
        min={0}
        onChange={handleChange}
        value={photoNumber.number}
      />

      {photoNumber.number !== 0 ? (
        <PhotoGalery number={photoNumber.number} />
      ) : null}
    </div>
  );
};

export default GaleryMain;
