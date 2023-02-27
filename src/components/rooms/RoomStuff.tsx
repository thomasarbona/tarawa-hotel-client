import Image from 'next/image';
import React from 'react';
import TranslatedString from '@/lib/kustom-client-sdk/components/TranslatedString';
import { Box, Heading, SimpleGrid, useTheme } from '@chakra-ui/react';
import { RoomStuffComponentData } from '@/lib/kustom-client-sdk/types';

interface RoomStuffProps {
  stuff?: RoomStuffComponentData;
}

const RoomStuff: React.FC<RoomStuffProps> = (props) => {
  const { stuff } = props;
  const theme = useTheme();

  return (
    <Box mt={14}>
      {stuff?.slides.map((slide) => {
        return (
          <Box key={slide.id} mb={10}>
            <TranslatedString fontSize="18px" isHeading fontWeight={700} mb={5}>
              {slide.title}
            </TranslatedString>
            <SimpleGrid columns={[2, 3, null, null, 4]} spacing={3}>
              {slide.stuff.map((item) => (
                <Box key={item.id}>
                  <Box w="100%" h="149px" position="relative">
                    {item.media && (
                      <Image
                        src={item.media?.url}
                        alt={'stuff'}
                        fill
                        style={{
                          objectFit: 'cover',
                          borderRadius: theme.radii.lg,
                        }}
                      />
                    )}
                  </Box>
                  <TranslatedString
                    fontFamily="heading"
                    fontSize="16px"
                    mt={2}
                    mb={4}
                    ml={1}
                  >
                    {item.title}
                  </TranslatedString>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        );
      })}
    </Box>
  );
};

export default RoomStuff;
