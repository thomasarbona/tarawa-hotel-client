import React from 'react';
import ResponsiveMedias from '@/lib/kustom-client-sdk/components/ResponsiveMedias';
import { Box, Text } from '@chakra-ui/react';
import { KustomResponsiveMedia } from '@/lib/kustom-client-sdk/types';

interface MediasCarouselProps {
  medias?: KustomResponsiveMedia[];
}

const MediasCarousel: React.FC<MediasCarouselProps> = (props) => {
  const { medias } = props;

  const [currentMediaIndex, setCurrentMediaIndex] = React.useState(0);

  const next = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentMediaIndex((prev) =>
      prev === (medias?.length || 0) - 1 ? 0 : prev + 1,
    );
  };

  const prev = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? (medias?.length || 0) - 1 : prev - 1,
    );
  };

  return (
    <Box w="100vw" h="250px" position="relative">
      {medias?.[currentMediaIndex] && (
        <ResponsiveMedias
          medias={medias[currentMediaIndex]}
          currentDevice={'mobile'}
          style={{
            objectFit: currentMediaIndex === 0 ? 'cover' : 'contain',
          }}
          fill
          width={undefined}
          height={undefined}
        />
      )}
      <Box
        position="absolute"
        zIndex={4}
        bottom={0}
        left={0}
        right={0}
        top={0}
        display="flex"
      >
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          background="transparent linear-gradient(180deg, #00000000 0%, #00000000 32%, #0000000E 61%, #000000 100%) 0% 0% no-repeat padding-box"
          opacity={0.5}
        ></Box>
        <Box h="100%" flex="1" zIndex={1} onClick={prev}></Box>
        <Box h="100%" flex="1" zIndex={1} onClick={next}></Box>
        <Box
          display="flex"
          position="absolute"
          bottom={0}
          left="50%"
          transform="translateX(-50%)"
          mb={4}
        >
          {medias?.map((media, index) => (
            <Box
              key={media.id}
              w={index === 0 ? 10 : 5}
              h="1"
              bgColor="white"
              mr={1}
              borderRadius="base"
              opacity={currentMediaIndex === index ? 1 : 0.5}
            />
          ))}
        </Box>
        <Box
          position="absolute"
          bgColor="rgba(0, 0, 0, 0.5)"
          px={4}
          py={1}
          borderRadius="base"
          bottom={0}
          right={0}
          mb={3}
          mr={5}
        >
          <Text
            fontFamily="heading"
            fontSize="18px"
            color="white"
            fontWeight={700}
          >
            {currentMediaIndex + 1} / {medias?.length}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MediasCarousel;
