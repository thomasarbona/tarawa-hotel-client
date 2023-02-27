import AtomicText from '@/lib/kustom-client-sdk/components/RichText';
import React from 'react';
import getResponsiveMedia from '@/lib/kustom-client-sdk/helpers/getResponsiveMedia';
import useIsVisible from '@/hooks/useIsVisible';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import { Box, SlideFade, Text, chakra } from '@chakra-ui/react';
import {
  CustomComponentData,
  KustomPageComponent,
} from '@/lib/kustom-client-sdk/types';
import {
  KustomMedia,
  MediaComponent,
  Text as AtomicComponentText,
} from '@/lib/kustom-client-sdk/types';
import {
  Parallax,
  ParallaxBanner,
  ParallaxBannerLayer,
} from 'react-scroll-parallax';
import { useScrollPercentage } from '@/hooks/useScrollPercentage';

import GrowingText from './GrowingText';

interface OceanSectionProps {
  component: KustomPageComponent<CustomComponentData>;
}

const OceanSection: React.FC<OceanSectionProps> = (props) => {
  const { component } = props;

  const title1 = component.data?.atomicComponents[0] as AtomicComponentText;
  const media = component.data?.atomicComponents[1] as MediaComponent;
  const title2 = component.data?.atomicComponents[2] as AtomicComponentText;
  const text = component.data?.atomicComponents[3] as AtomicComponentText;

  const disappearRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(disappearRef);
  const currentDevice = useResponsiveMediasDevice();

  const [ref, percentage] = useScrollPercentage({
    threshold: 0,
  });

  return (
    <Box position="relative" h="180vh">
      <ParallaxBanner
        style={{ height: '100%', position: 'absolute', marginTop: 2 }}
      >
        <ParallaxBannerLayer
          image={getResponsiveMedia(media.media, currentDevice)?.url}
          speed={50}
        />
      </ParallaxBanner>

      <Box
        position={'absolute'}
        top={'100vh'}
        w="100vw"
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
      >
        <Box
          ref={ref}
          display="flex"
          flexDir="column"
          p="10"
          color="white"
          px={[10, null, null, null, '400px']}
          opacity="0.9"
        >
          <SlideFade
            in={isVisible}
            transition={{ enter: { duration: 0.3 }, exit: { duration: 0.3 } }}
            offsetY={50}
            style={{
              position: 'relative',
              top: -200,
            }}
          >
            <AtomicText
              fontFamily={'body'}
              fontWeight="bold"
              fontSize={['34px', null, null, null, '58px']}
              lineHeight={1.2}
              text={title2?.text}
            />
            <AtomicText
              mt={[5, null, null, null, 10]}
              fontSize={['16px', null, null, null, '24px']}
              text={text?.text}
            />
          </SlideFade>
        </Box>
        <Box ref={disappearRef}></Box>
      </Box>
      <Box
        position="sticky"
        opacity="1"
        top={0}
        h="100vh"
        w="100vw"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        display={isVisible ? 'none' : 'flex'}
      >
        <GrowingText percentage={percentage} />
      </Box>
    </Box>
  );
};

export default OceanSection;
