import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Image: React.FC<ImageProps> = ({ src, ...rest }) => {
  const resolvedSrc = src && src.includes('https://')
    ? src
    : `http://localhost:4000/uploads/${src}`;

  return (
    <img {...rest} src={resolvedSrc} alt="" />
  );
};

export default Image;
