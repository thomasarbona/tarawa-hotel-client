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
      pb={20}
    >
      <Box>
        <RichText
          color="white"
          fontWeight="bold"
          fontSize={['42px', null, '90px', null, '136px']}
          px={[10, null, null, '20vw']}
          py={[40, null, null, 60]}
          lineHeight={1.2}
          textAlign="center"
          text={title}
        />
      </Box>
      {/* @ts-ignore */}
      <ParallaxProvider scrollAxis="horizontal">
        <Box display="flex" flexWrap="nowrap" overflowX="scroll" pb={5}>
          {slides?.map((slide, index) => {
            const media1 = slide?.medias;
            const title = slide?.title;
            const text = slide.atomicComponents[0] as Text;
            const media2 = slide.atomicComponents[1] as MediaComponent;

            return (
              <Box
                key={slide.id}
                display="flex"
                mx={[10, null, 20, 40]}
                flexDirection={
                  index === slides.length - 1 ? 'row-reverse' : undefined
                }
              >
                <Box
                  w={['228px', null, '330px', '420px']}
                  position="relative"
                  flexShrink={0}
                >
                  <ResponsiveMedias
                    medias={media1}
                    currentDevice={currentDevice}
                    style={{
                      objectFit: 'contain',
                      borderRadius: theme.radii.md,
                    }}
                  />
                </Box>
                <Box
                  pl={[10, null, 16, 20]}
                  pt={index % 2 ? 40 : 20}
                  pr={index === slides.length - 1 ? [5, null, 10, 20] : 0}
                  display={index % 2 ? 'flex' : undefined}
                >
                  <Box
                    minW={'400px'}
                    maxW={['100vw', null, 'none']}
                    pr={10}
                    mr={[2, null, null, 10]}
                  >
                    <RichText
                      fontFamily="heading"
                      fontWeight="bold"
                      fontSize={['24px', null, null, '40px']}
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
                    mt={[index % 2 ? 2 : 10, null, null, index % 2 ? 5 : 20]}
                    w={[
                      index % 2 ? '400px' : '350px',
                      null,
                      index % 2 ? '500px' : '400px',
                      index % 2 ? '700px' : '500px',
                    ]}
                    position="relative"
                    flexShrink={0}
                  >
                    <ResponsiveMedias
                      medias={media2?.media}
                      currentDevice={currentDevice}
                      style={{
                        objectFit: 'contain',
                        borderRadius: theme.radii.md,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </ParallaxProvider>
    </Box>
  );
};

export default Slideshow;
