import Image, { ImageProps } from 'next/image';
import { Box } from '@chakra-ui/react';

import getMediaType, { MediaType } from '../helpers/getMediaType';
import { KustomMedia, KustomResponsiveMedia } from '../types';

interface ResponsiveMediasProps extends Partial<ImageProps> {
  medias: KustomResponsiveMedia;
  currentDevice: keyof KustomResponsiveMedia;
}

const ResponsiveMedias = (props: ResponsiveMediasProps) => {
  const { medias, currentDevice, ...imageProps } = props;

  const media = (medias[currentDevice] as KustomMedia) || medias.default;

  const isVideo = getMediaType(media.filename) === MediaType.VIDEO;

  if (isVideo) {
    return (
      <video
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={media.url} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      alt="media"
      src={media.url}
      width={+(media.metadata.width || '')}
      height={+(media.metadata.height || '')}
      {...imageProps}
    />
  );
};

export default ResponsiveMedias;
