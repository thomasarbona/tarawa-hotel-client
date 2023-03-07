import ResponsiveMedias from '@/lib/kustom-client-sdk/components/ResponsiveMedias';
import RichText from '@/lib/kustom-client-sdk/components/RichText';
import useDistToTop from '@/hooks/useDistToTop';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import useWindowWidth from '@/hooks/useWindowWidth';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import {
  KustomPageComponent,
  MediaComponent,
  Text,
  TextCarouselComponentData,
} from '@/lib/kustom-client-sdk/types';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';

interface SlideshowProps {
  component: KustomPageComponent<TextCarouselComponentData>;
}

gsap.registerPlugin(ScrollTrigger);

const Slideshow: React.FC<SlideshowProps> = (props) => {
  const { component } = props;

  const theme = useTheme();

  const title = component.data?.textTitle;
  const slides = component.data?.slides;

  const currentDevice = useResponsiveMediasDevice();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || currentDevice === 'mobile') return;

    let sections = gsap.utils.toArray<HTMLElement>('.horizontal-item');

    const x = sections.reduce(
      (acc, el) => acc - el.getBoundingClientRect().width,
      0,
    );

    const _x =
      x -
      (currentDevice !== 'default'
        ? x / sections.length / 4
        : x / sections.length);

    let scrollTween = gsap.to(sections, {
      x: _x,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        // start: 'top top',
        pin: true,
        scrub: 0.1,
        end: '+=' + -x,
      },
    });

    return () => {
      scrollTween.revert();
    };
  }, [ref, currentDevice]);

  return (
    <Box
      bg="transparent linear-gradient(180deg, #D2D1CA 0%, #BBB9AF 100%) 0% 0% no-repeat padding-box"
      pb={[20]}
      position="relative"
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
        ref={ref}
        className="horizontal-container"
        display="flex"
        flexDir={['column', null, 'row']}
        flexWrap="nowrap"
        overflowX="hidden"
        // w="300%"
      >
        {slides?.map((slide, index) => {
          const media1 = slide?.medias;
          const title = slide?.title;
          const text = slide.atomicComponents[0] as Text;
          const media2 = slide.atomicComponents[1] as MediaComponent;

          return (
            <Box
              key={slide.id}
              className="horizontal-item"
              display="flex"
              flexDir={['column', 'row']}
              mx={[10, null, 20]}
              position={'relative'}
              my={10}
            >
              <Box
                order={['unset', index === slides.length - 1 ? 2 : null]}
                w={['100%', '420px']}
                maxH="90vh"
                position="relative"
                ml={index === slides.length - 1 ? [0, 20] : 0}
                flexShrink={0}
              >
                <ResponsiveMedias
                  medias={media1}
                  currentDevice={currentDevice}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: theme.radii.md,
                  }}
                  fill
                  width={undefined}
                  height={undefined}
                />
              </Box>
              <Box
                pl={index === slides.length - 1 ? 0 : [0, 20]}
                pt={[10, index % 2 ? 10 : 10]}
                pr={index === slides.length - 1 ? [0, 10] : 0}
                display={['unset', index % 2 ? 'flex' : null]}
                textAlign={['center', 'left']}
              >
                <Box
                  minW={['unset', '400px']}
                  maxW={['100%', 'none']}
                  pr={[5, 10]}
                  pt={[0, index % 2 ? 40 : 0]}
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
                  mt={[5, index % 2 ? 5 : 10, null, index % 2 ? 5 : 20]}
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
