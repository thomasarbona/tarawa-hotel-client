import { KustomMedia, KustomResponsiveMedia } from '../types';

const getResponsiveMedia = (
  media: KustomResponsiveMedia,
  device: Omit<keyof KustomResponsiveMedia, 'id'>,
) => {
  return (media[device as keyof KustomResponsiveMedia] ||
    media.default) as KustomMedia;
};

export default getResponsiveMedia;
