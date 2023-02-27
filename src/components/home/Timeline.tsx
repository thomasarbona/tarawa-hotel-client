import AtomicActionButton from '@/lib/kustom-client-sdk/components/atomics/ActionButton';
import ResponsiveMedias from '@/lib/kustom-client-sdk/components/ResponsiveMedias';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import {
  ActionButton,
  CarouselComponentData,
  KustomPageComponent,
  KustomResponsiveMedia,
} from '@/lib/kustom-client-sdk/types';
import {
  Box,
  Container,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Parallax } from 'react-scroll-parallax';

interface TimelineProps {
  component: KustomPageComponent<CarouselComponentData>;
}

const Timeline = (props: TimelineProps) => {
  const { component } = props;

  const slides = component.data?.slides;

  const deviceName = useResponsiveMediasDevice();

  const mediasSizes = useBreakpointValue({
    base: [
      { w: '100vw', h: undefined },
      { w: '150vw', h: undefined },
      { w: '150vw', h: undefined },
      { w: '100vw', h: undefined },
      { w: '100vw', h: undefined },
    ],
    md: [
      {
        w: '480px',
        h: '320px',
      },
      {
        w: '480px',
        h: '344px',
      },
      {
        w: '480px',
        h: '480px',
      },
      {
        w: '400px',
        h: '720px',
      },
      {
        w: '480px',
        h: '480px',
      },
    ],
    lg: [
      { w: '600px', h: '400px' },
      { w: '600px', h: '430px' },
      { w: '600px', h: '600px' },
      { w: '500px', h: '900px' },
      { w: '600px', h: '600px' },
    ],
    xl: [
      { w: '850px', h: '500px' },
      { w: '900px', h: '600px' },
      { w: '900px', h: '900px' },
      { w: '700px', h: '1240px' },
      { w: '900px', h: '900px' },
    ],
    '2xl': [
      { w: '1000px', h: '600px' },
      { w: '1100px', h: '600px' },
      { w: '1100px', h: '1100px' },
      { w: '950px', h: '1700px' },
      { w: '1100px', h: '1100px' },
    ],
  });

  const slidesStyle = [
    {},
    {},
    {},
    {
      my: [null, null, null, -40],
    },
    {},
  ];

  const parallaxSpeed = deviceName !== 'default' ? 2 : 20;

  return (
    <Box
      bgColor="white"
      minH="100vh"
      display="flex"
      justifyContent="center"
      overflow="hidden"
    >
      <Container maxW="container.xl" boxSizing="border-box" p={0} centerContent>
        {slides?.map((slide, index) => (
          <Box
            key={slide.id}
            position="relative"
            display="flex"
            justifyContent="end"
            w="100%"
            {...slidesStyle[index]}
          >
            {/* line */}
            <Box
              w={0}
              borderRight="1px solid"
              borderColor="gray.200"
              position="absolute"
              left="50%"
              top={0}
              bottom={0}
              display={['block', null, 'none']}
            ></Box>
            <Box
              display="flex"
              flexDir={['column', null, index % 2 ? 'row-reverse' : 'row']}
              justifyContent={['center', null, null, null]}
              alignItems="center"
              position="relative"
              pt={['60px', null, null, null, '20px']}
              w="100%"
            >
              <Box
                display="flex"
                alignItems="center"
                flexDir="column"
                flex={0.5}
                px={16}
                pr={[null, null, null, null, null, index % 2 ? 0 : '100px']}
                pl={[null, null, null, null, null, index % 2 ? '100px' : 0]}
              >
                <Parallax
                  speed={-parallaxSpeed}
                  opacity={[0, deviceName === 'mobile' ? 4 : 2]}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Heading
                    fontFamily="fantasy"
                    color="brand.500"
                    fontSize={'123px'}
                    my={10}
                    mb={[10, null, 0]}
                  >
                    {slide.title.fr}
                  </Heading>
                  <Text fontFamily="heading" fontSize="24px" textAlign="center">
                    {slide.subtitle.fr}
                  </Text>
                  {slide.atomicComponents[0].type === 'ACTION_BUTTON' && (
                    <AtomicActionButton
                      button={slide.atomicComponents[0] as ActionButton}
                      bgColor="gray.100"
                      border="1px solid"
                      borderColor="gray.200"
                      px={7}
                      py={7}
                      mt={7}
                      mb={9}
                    />
                  )}
                </Parallax>
              </Box>
              <Parallax
                speed={parallaxSpeed}
                opacity={[0, deviceName === 'mobile' ? 4 : 2]}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flex: 1,
                  height: mediasSizes?.[index]?.h,
                }}
              >
                <Box
                  w={mediasSizes?.[index]?.w}
                  h={mediasSizes?.[index]?.h}
                  borderRadius="xl"
                  overflow="hidden"
                  position={['relative', null, null, 'absolute']}
                  right={['auto', 'auto', 'auto', index % 2 ? 0 : 'auto']}
                  left={['auto', 'auto', 'auto', index % 2 ? 'auto' : 0]}
                  justifyContent={[
                    'center',
                    null,
                    null,
                    index % 2 ? 'flex-end' : 'flex-start',
                  ]}
                  alignItems={['center', null, null, 'end']}
                >
                  <ResponsiveMedias
                    medias={slide.medias}
                    currentDevice={deviceName}
                    style={{
                      objectFit: 'cover',
                    }}
                    {...(deviceName !==
                      ('mobile' as keyof KustomResponsiveMedia) && {
                      width: undefined,
                      height: undefined,
                      fill: true,
                    })}
                  />
                </Box>
              </Parallax>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Timeline;
