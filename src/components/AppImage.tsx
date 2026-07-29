import { Image, type ImageProps } from "@mantine/core";
import { useState } from "react";

const PLACEHOLDER = "https://placehold.co/300x200?text=No+Image";

const AppImage = ({ src, ...props }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  return (
    <Image
      src={imgSrc}
      fit="contain"
      onError={() => setImgSrc(PLACEHOLDER)}
      {...props}
    />
  );
};

export default AppImage;
