import React from 'react';
import Image, { ImageProps } from 'next/image';
import { Box } from '@chakra-ui/react';

import getMediaType, { MediaType } from '../helpers/getMediaType';
import { KustomMedia, KustomResponsiveMedia } from '../types';

interface ResponsiveMediasProps extends Partial<ImageProps> {
  medias: KustomResponsiveMedia;
  style?: any;
  currentDevice: keyof KustomResponsiveMedia;
}

const ResponsiveMedias = (
  props: ResponsiveMediasProps,
  ref: React.ForwardedRef<HTMLVideoElement | HTMLImageElement>,
) => {
  const { medias, currentDevice, style, ...imageProps } = props;

  const media = (medias[currentDevice] as KustomMedia) || medias.default;

  const isVideo = getMediaType(media.filename) === MediaType.VIDEO;

  if (isVideo) {
    return (
      <video
        ref={ref as React.RefObject<HTMLVideoElement>}
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...style,
        }}
      >
        <source src={media.url} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      ref={ref as React.RefObject<HTMLImageElement>}
      alt="media"
      src={media.url}
      width={+(media.metadata.width || '')}
      height={+(media.metadata.height || '')}
      style={style}
      {...imageProps}
    />
  );
};

export default React.forwardRef(ResponsiveMedias);
