import React from 'react';
import ResponsiveMedias from '@/lib/kustom-client-sdk/components/ResponsiveMedias';
import RichText from '@/lib/kustom-client-sdk/components/RichText';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import { Box, useTheme } from '@chakra-ui/react';
import {
  KustomPageComponent,
  MediaComponent,
  Text,
  TextCarouselComponentData,
} from '@/lib/kustom-client-sdk/types';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

interface SlideshowProps {
  component: KustomPageComponent<TextCarouselComponentData>;
}

const Slideshow: React.FC<SlideshowProps> = (props) => {
  const { component } = props;

  const theme = useTheme();

  console.log(component);

  const title = component.data?.textTitle;
  const slides = component.data?.slides;

  const currentDevice = useResponsiveMediasDevice();

  return (
    <Box
      bg="transparent linear-gradient(180deg, #D2D1CA 0%, #BBB9AF 100%) 0% 0% no-repeat padding-box"
      pb={[20, '900px']}
    >
      <Box>
        <RichText
          color="white"
          fontWeight="bold"
          fontSize={['42px', null, '90px', null, '136px']}
          px={[10, null, '20vw']}
          py={[20]}
          lineHeight={1.2}
          textAlign="center"
          text={title}
        />
      </Box>
      <Box
        position={['unset', 'absolute']}
        className="hideScrollbar"
        display="flex"
        flexDir="column"
        width={['100vw', '900px']}
        height={['unset', '100vw']}
        // flexWrap="nowrap"
        overflowY="auto"
        overflowX="hidden"
        transform={['unset', 'rotate(-90deg) translateY(-900px)']}
        transformOrigin="right top"
      >
        {slides?.map((slide, index) => {
          const media1 = slide?.medias;
          const title = slide?.title;
          const text = slide.atomicComponents[0] as Text;
          const media2 = slide.atomicComponents[1] as MediaComponent;

          return (
            <Box
              key={slide.id}
              display="flex"
              maxW={['100vw', 'unset']}
              flexDir={['column', 'row']}
              mx={[10, null, 20, 40]}
              transform={['unset', 'rotate(90deg)']}
              transformOrigin="left top"
              position={'relative'}
              right={['unset', '-100%']}
              pt={[0, 40]}
              my={20}
              mt={[!index ? 0 : 20, 20]}
              mb={[0, index % 2 ? '1000px' : 80]}
            >
              <Box
                order={['unset', index === slides.length - 1 ? 2 : null]}
                w={['100%', '420px']}
                position="relative"
                ml={index === slides.length - 1 ? [0, 20] : 0}
                flexShrink={0}
              >
                <ResponsiveMedias
                  medias={media1}
                  currentDevice={currentDevice}
                  style={{
                    objectFit: 'cover',
                    borderRadius: theme.radii.md,
                  }}
                />
              </Box>
              <Box
                pl={index === slides.length - 1 ? 0 : [0, 20]}
                pt={[10, index % 2 ? 40 : 20]}
                pr={index === slides.length - 1 ? [0, 10] : 0}
                display={['unset', index % 2 ? 'flex' : null]}
                textAlign={['center', 'left']}
              >
                <Box
                  minW={['unset', '400px']}
                  maxW={['100%', 'none']}
                  pr={[5, 10]}
                  mr={[0, 10]}
                >
                  <RichText
                    fontFamily="heading"
                    fontWeight="bold"
                    fontSize={['24px', '40px']}
                    color="white"
                    mb={1}
                    text={title}
                  />
                  <RichText
                    color="white"
                    fontSize={['16px']}
                    text={text.text}
                  />
                </Box>
                <Box
                  mt={[5, index % 2 ? 5 : 20]}
                  w={['100%', index % 2 ? '700px' : '500px']}
                  h={['200px', 'unset']}
                  position="relative"
                  flexShrink={0}
                >
                  <ResponsiveMedias
                    medias={media2?.media}
                    currentDevice={currentDevice}
                    style={{
                      objectFit:
                        currentDevice === 'mobile' ? 'cover' : 'contain',
                      borderRadius: theme.radii.md,
                    }}
                    fill
                    width={undefined}
                    height={undefined}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Slideshow;
