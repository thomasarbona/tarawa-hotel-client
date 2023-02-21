import Image from 'next/image';
import PagesContext from '@/contexts/pages';
import React, { useContext } from 'react';
import { Box, Heading, Text, useTheme } from '@chakra-ui/react';
import {
  KustomPageComponent,
  MediasComponentData,
  RoomSpecsComponentData,
} from '@/lib/kustom-client-sdk/types';

interface RoomsProps {}

const Rooms: React.FC<RoomsProps> = (props) => {
  const {} = props;

  const theme = useTheme();

  const pages = useContext(PagesContext);

  const rooms = Object.values(pages.routes).filter(
    (page) => page.model === 'room',
  );

  console.log(theme);

  return (
    <Box w="100%">
      {rooms.map((room) => {
        const mediaCmp = room
          .components[3] as KustomPageComponent<MediasComponentData>;

        const specsCmp = room
          .components[0] as KustomPageComponent<RoomSpecsComponentData>;
        const specs = specsCmp.data;

        const defaultMedia = mediaCmp.data.medias[0].default;

        console.log('media', defaultMedia);

        return (
          <Box
            key={room._id}
            h="400px"
            position="relative"
            borderRadius="2xl"
            overflow="hidden"
            border="5px solid"
            borderColor="gray.100"
            cursor="pointer"
            _hover={{
              outline: '6px solid',

              outlineColor: 'brand.500',
            }}
            mb={5}
          >
            {defaultMedia?.url && (
              <Image
                alt="room"
                src={defaultMedia?.url}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            )}
            <Box
              position="absolute"
              bottom="0"
              color="white"
              bg="linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(9,9,121,0) 100%);"
              w="100%"
              p={3}
              pt={20}
            >
              <Heading fontWeight="bold" fontSize="24px">
                {specs.title.fr}
              </Heading>
              <Text color="white" fontSize="16px">
                {specs.area} · {specs.peoplesNumber} personnes · {specs.bed}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Rooms;
