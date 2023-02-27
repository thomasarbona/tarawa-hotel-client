import Drawer from 'react-modern-drawer';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import ConditionalWrapper from '../ConditionalWrapper';
import RoomPage from './RoomPage';
import Rooms from './Rooms';

interface RoomsPagesProps {}

const roomRegex = /chambre-(.*)/;

const RoomsPages: React.FC<RoomsPagesProps> = (props) => {
  const {} = props;
  const router = useRouter();

  const route = router.asPath.split('#')[1];

  const match = useMemo(() => route?.match(roomRegex), [route]);
  const isRoomOpen = !!match?.length;
  const isRoomsOpen = !!route?.startsWith('chambre');

  const breakpoint = useBreakpoint();
  const [isRoomsVisible, roomsSize] = useBreakpointValue({
    base: [false, 300],
    lg: [isRoomsOpen, 300],
    xl: [isRoomsOpen, 496],
  }) as [boolean, number];

  const close = () => {
    if (isRoomOpen && !isRoomsVisible) {
      router.push(router.asPath.split('#')[0] + '#chambres');
    } else {
      router.push(router.asPath.split('#')[0]);
    }
  };

  useEffect(() => {
    if (isRoomOpen || isRoomsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isRoomOpen, isRoomsOpen]);

  return (
    <>
      <RoomPage
        isOpen={isRoomOpen}
        onClose={close}
        roomSlug={match?.[1]}
        parentDrawerWidth={roomsSize}
      />

      <Drawer
        open={isRoomOpen ? isRoomsVisible : isRoomsOpen}
        onClose={close}
        direction="right"
        size={breakpoint === 'base' ? '100%' : roomsSize + 'px'}
        style={{ maxWidth: '100vw' }}
        enableOverlay={!isRoomOpen}
      >
        <Box
          px={6}
          maxH="100%"
          overflowY="scroll"
          bgColor="gray.100"
          minHeight="100vh"
        >
          <Heading pt={10} fontWeight="bold" fontSize="28px" mb={2} ml={2}>
            Nos chambres et suites
          </Heading>
          <Rooms />
        </Box>
      </Drawer>
    </>
  );
};

export default RoomsPages;
