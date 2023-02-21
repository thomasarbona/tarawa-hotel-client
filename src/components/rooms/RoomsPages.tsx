import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Rooms from './Rooms';

interface RoomsPagesProps {}

const RoomsPages: React.FC<RoomsPagesProps> = (props) => {
  const {} = props;
  const router = useRouter();

  const close = () => {
    router.push(router.asPath.split('#')[0]);
  };

  const route = router.asPath.split('#')[1];

  const isRoomOpen = route === 'chambre';
  const isRoomsOpen = isRoomOpen || route === 'chambres';

  console.log(router.asPath);

  return (
    <>
      <Drawer isOpen={isRoomOpen} placement="right" onClose={close} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody display="flex">
            <Box h="100vh" bgColor="yelllow">
              ROOM
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer isOpen={isRoomsOpen} placement="right" onClose={close} size="sm">
        <DrawerOverlay />
        <DrawerContent bgColor="gray.100">
          <DrawerCloseButton
            zIndex={99}
            bgColor="white"
            p={3}
            borderRadius="full"
            fontSize="12px"
            color="gray.800"
          />

          <DrawerBody display="flex" flexDir="column">
            <Heading pt={10} fontWeight="bold" fontSize="28px" mb={2} ml={2}>
              Nos chambres et suites
            </Heading>
            <Rooms />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RoomsPages;
