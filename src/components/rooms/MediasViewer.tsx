import ResponsiveMedias from '@/lib/kustom-client-sdk/components/ResponsiveMedias';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, IconButton, Portal, useTheme } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { KustomResponsiveMedia } from '@/lib/kustom-client-sdk/types';

interface MediaViewerProps {
  isOpen: boolean;
  medias: KustomResponsiveMedia[];
  currentMedia?: KustomResponsiveMedia;
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = (props) => {
  const { isOpen, medias, currentMedia: _currentMedia, onClose } = props;

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const theme = useTheme();

  const currentDevice = useResponsiveMediasDevice();

  useEffect(() => {
    if (!_currentMedia) return;

    setCurrentMediaIndex(
      medias.findIndex((media) => media.id === _currentMedia.id),
    );
  }, [_currentMedia, medias]);

  if (!isOpen) return null;

  const prev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev === 0 ? medias.length - 1 : prev - 1));
  };
  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev === medias.length - 1 ? 0 : prev + 1));
  };

  const currentMedia = medias[currentMediaIndex];

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        bottom={0}
        left={0}
        right={0}
        bg="rgba(0, 0, 0, 0.7)"
        zIndex={999}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClose}
        px={5}
      >
        <Container
          maxW="container.lg"
          h={['70vh', null, null, null, '80vh']}
          py={10}
          position="relative"
          top={[-10, null, null, null, 0]}
          centerContent
        >
          <IconButton
            position="absolute"
            top={[null, null, null, null, '50%']}
            left={['30%', null, null, null, -16]}
            bottom={[-24, null, null, null, 'unset']}
            zIndex={999}
            aria-label={'next-image'}
            icon={<ChevronLeftIcon w={8} h={8} />}
            isRound
            p={4}
            w={[16, null, null, null, 10]}
            h={[16, null, null, null, 10]}
            onClick={prev}
          />

          <IconButton
            position="absolute"
            top={[null, null, null, null, '50%']}
            right={['30%', null, null, null, -16]}
            bottom={[-24, null, null, null, 'unset']}
            zIndex={999}
            aria-label={'next-image'}
            icon={<ChevronRightIcon w={8} h={8} />}
            isRound
            p={4}
            w={[16, null, null, null, 10]}
            h={[16, null, null, null, 10]}
            onClick={next}
          />
          <ResponsiveMedias
            medias={currentMedia}
            currentDevice={currentDevice}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: theme.radii.lg,
              boxShadow: '0px 0px 77px #00000029',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              outline: '12px solid white',
            }}
          />
        </Container>
      </Box>
    </Portal>
  );
};

export default MediaViewer;
