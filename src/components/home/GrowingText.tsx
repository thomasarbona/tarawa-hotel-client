import React from 'react';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import { Box, chakra } from '@chakra-ui/react';

interface GrowingTextProps {
  percentage: number;
}

function easeInOutSine(t: number) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}

const GrowingText: React.FC<GrowingTextProps> = (props) => {
  const { percentage } = props;

  const deviceName = useResponsiveMediasDevice();

  const fontSize =
    (deviceName === 'mobile' ? 50 : 100) + 5000 * easeInOutSine(percentage);
  const opacity = 1.6 - percentage * 5;

  return (
    <Box fontWeight="bold" opacity={opacity}>
      <chakra.svg w="100vw" h="100vh">
        <defs>
          <chakra.mask id="mask" x="0" y="0" width="100%" height="100%">
            <chakra.rect fill="white" x="0" y="0" width="100%" height="100%" />
            <chakra.text
              textAnchor="middle"
              id="text"
              x="50%"
              y="50%"
              dy="5px"
              dx="5px"
              fontSize={fontSize + 'px'}
            >
              <tspan x="50%">UN PARADIS</tspan>
              <tspan x="50%" dy="0.8em">
                EN TURQUOISE
              </tspan>
            </chakra.text>
          </chakra.mask>
        </defs>
        <chakra.rect
          fill="white"
          mask="url(#mask)"
          x="0"
          y="0"
          width="100%"
          height="100%"
        />
      </chakra.svg>
    </Box>
  );
};

export default GrowingText;
