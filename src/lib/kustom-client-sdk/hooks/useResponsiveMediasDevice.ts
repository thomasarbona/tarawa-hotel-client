import { KustomResponsiveMedia } from '@/lib/kustom-client-sdk/types';
import { useBreakpointValue } from '@chakra-ui/react';

const useResponsiveMediasDevice = (): keyof KustomResponsiveMedia => {
  return (
    useBreakpointValue({
      base: 'mobile',
      sm: 'mobile',
      md: 'tablet',
      lg: 'default',
      xl: 'default',
    }) || 'default'
  );
};

export default useResponsiveMediasDevice;
