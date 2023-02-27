import AtomicActionButton from '@/lib/kustom-client-sdk/components/atomics/ActionButton';
import React from 'react';
import RichText from '@/lib/kustom-client-sdk/components/RichText';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import {
  ActionButton,
  KustomMedia,
  KustomPageComponent,
  TextImageComponentData,
} from '@/lib/kustom-client-sdk/types';
import { Box } from '@chakra-ui/react';

interface OffersProps {
  component: KustomPageComponent<TextImageComponentData>;
}

const Offers: React.FC<OffersProps> = (props) => {
  const { component } = props;

  const medias = component.data?.media;
  const text = component.data?.text;
  const button = component.data?.atomicComponents[0] as ActionButton;

  const currentDevice = useResponsiveMediasDevice();
  const media = (medias?.[currentDevice] as KustomMedia) || medias?.default;

  return (
    <Box
      bgImage={`url(${media?.url})`}
      bgSize="cover"
      bgPosition={['bottom', null, 'right']}
      py={48}
      px={[10, null, 20, 40]}
      pb={[60, '500px', 48]}
      display="flex"
      flexDir="column"
      alignItems={['center', null, 'flex-start']}
      overflow="hidden"
    >
      <RichText
        textAlign={['center', null, 'left']}
        maxW={[null, null, null, '60vw', '40vw']}
        fontSize={['40px', null, '60px', '72px']}
        color="black"
        lineHeight={1}
        fontWeight="bold"
        text={text}
      />
      <AtomicActionButton
        mt={8}
        colorScheme="brand"
        px={8}
        py={6}
        button={button}
      />
    </Box>
  );
};

export default Offers;
