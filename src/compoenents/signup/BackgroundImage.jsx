import React from 'react';

const BackgroundImage = ({ backgroundImage, logoImage }) => {
  return (
    <div className="image-container">
      <img src={backgroundImage} alt="Background" className="bg-image" />
      <img src={logoImage} alt="Logo" className="logo" />
    </div>
  );
};
export default BackgroundImage;