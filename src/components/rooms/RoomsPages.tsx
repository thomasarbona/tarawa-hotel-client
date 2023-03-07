import Drawer from 'react-modern-drawer';
import PagesContext from '@/lib/kustom-client-sdk/contexts/pages';
import React, { useContext, useEffect, useMemo } from 'react';
import {
  Box,
  Heading,
  IconButton,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
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

  const pages = useContext(PagesContext);

  const rooms = Object.values(pages.routes).filter(
    (page) => page.model === 'room',
  );

  const breakpoint = useBreakpoint();
  const [isRoomsVisible, roomsSize] = useBreakpointValue({
    base: [false, 300],
    lg: [isRoomsOpen, 300],
    xl: [isRoomsOpen, 496],
  }) as [boolean, number];

  const close = () => {
    router.replace(router.asPath.split('#')[0], undefined, { scroll: false });
  };

  useEffect(() => {
    if (router.asPath.split('#')[1] === 'chambres' && breakpoint !== 'base') {
      setTimeout(() => {
        router
          .replace('/#chambre-' + rooms[0].prettyUrl, undefined, {
            shallow: true,
          })
          .catch((e) => {
            // workaround for https://github.com/vercel/next.js/issues/37362
            if (!e.cancelled) {
              throw e;
            }
          });
      }, 0);
    }
  }, [rooms, router, router.asPath, breakpoint]);

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
          <IconButton
            position="absolute"
            top="10px"
            right="10px"
            zIndex="100"
            aria-label="Close"
            icon={<CloseIcon />}
            isRound
            onClick={close}
            boxShadow="md"
          />
          <Heading pt={10} fontWeight="bold" fontSize="28px" mb={2} ml={2}>
            Nos chambres et suites
          </Heading>
          <Rooms roomSlug={match?.[1]} />
        </Box>
      </Drawer>
    </>
  );
};

export default RoomsPages;
