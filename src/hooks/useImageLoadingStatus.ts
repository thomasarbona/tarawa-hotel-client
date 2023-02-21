import { RefObject, useEffect, useState } from 'react';

const useImageLoadingStatus = (
  ref: RefObject<HTMLElement>,
): [boolean, number] => {
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateStatus = (images: HTMLImageElement[]) => {
      setStatus(
        images.map((image) => image.complete).every((item) => item === true),
      );
      setProgress(
        Math.round(
          images.filter((image) => image.complete).length * progressStep,
        ),
      );
    };

    if (!ref?.current) return;

    const imagesLoaded = Array.from(ref.current.querySelectorAll('img'));

    if (imagesLoaded.length === 0) {
      setStatus(true);
      return;
    }

    const progressStep = Math.round(100 / imagesLoaded.length);

    imagesLoaded.forEach((image) => {
      updateStatus(imagesLoaded);

      image.addEventListener('load', () => updateStatus(imagesLoaded), {
        once: true,
      });
      image.addEventListener('error', (e) => {}, {
        once: true,
      });
    });

    return;
  }, [ref]);

  return [status, progress];
};

export default useImageLoadingStatus;
