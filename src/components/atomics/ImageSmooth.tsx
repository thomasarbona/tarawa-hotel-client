import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const ImageSmooth = (props: ImageProps) => {
  const [blur, setBlur] = useState(true);
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...(props as ImageProps)}
      className={blur ? 'img-blur' : 'unblur'}
      onLoadingComplete={() => setBlur(false)}
    />
  );
};

export default ImageSmooth;
