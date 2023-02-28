import Drawer from 'react-modern-drawer';
import PagesContext from '@/lib/kustom-client-sdk/contexts/pages';
import ResponsiveMedias from '@/lib/kustom-client-sdk/components/ResponsiveMedias';
import RichText from '@/lib/kustom-client-sdk/components/RichText';
import TranslatedString from '@/lib/kustom-client-sdk/components/TranslatedString';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import React, { useContext, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Text,
  useBreakpoint,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import {
  KustomPageComponent,
  KustomResponsiveMedia,
  MediasComponentData,
  RoomSpecsComponentData,
  RoomStuffComponentData,
  TextComponentData,
} from '@/lib/kustom-client-sdk/types';

import ExpandableText from '../atomics/ExpandableText';
import MediasCarousel from './MediasCarousel';
import MediasViewer from './MediasViewer';
import RoomStuff from './RoomStuff';

interface RoomPageProps {
  isOpen: boolean;
  onClose: () => void;
  parentDrawerWidth?: number;
  roomSlug?: string;
}

const RoomPage: React.FC<RoomPageProps> = (props) => {
  const { isOpen, onClose, parentDrawerWidth = 496, roomSlug } = props;

  const width = 1320;

  const pages = useContext(PagesContext);

  const [currentMediaViewer, setCurrentMediaViewer] = useState<
    KustomResponsiveMedia | undefined
  >(undefined);

  const room = roomSlug ? pages.routes[roomSlug] : undefined;

  const bp = useBreakpoint();
  const deviceName = useResponsiveMediasDevice();

  const openMediaViewer = (media: KustomResponsiveMedia) => {
    setCurrentMediaViewer(media);
  };

  const breakpoint = useBreakpoint();

  const specs = (
    room?.components[0] as
      | KustomPageComponent<RoomSpecsComponentData>
      | undefined
  )?.data;

  const description = (
    room?.components[1] as KustomPageComponent<TextComponentData> | undefined
  )?.data;

  const stuff = (
    room?.components[2] as
      | KustomPageComponent<RoomStuffComponentData>
      | undefined
  )?.data;

  const mediasData = (
    room?.components?.[3] as
      | KustomPageComponent<MediasComponentData>
      | undefined
  )?.data;

  console.log(breakpoint);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size={bp === 'base' ? '100%' : parentDrawerWidth + width + 'px'}
      style={{ maxWidth: '100vw' }}
    >
      <Box
        h="100vh"
        maxH="100%"
        overflowY="scroll"
        bgColor="gray.100"
        paddingRight={[0, null, null, parentDrawerWidth + 'px']}
      >
        <Box p={[0, null, 8]} position="relative">
          <IconButton
            position="absolute"
            top="10px"
            right="10px"
            zIndex="100"
            aria-label="Close"
            icon={<CloseIcon />}
            isRound
            onClick={onClose}
            boxShadow="md"
          />
          {breakpoint === 'base' ? (
            <MediasCarousel medias={mediasData?.medias} />
          ) : (
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap="1.5"
              h="502px"
            >
              {mediasData?.medias?.slice(0, 5).map((media, index) => (
                <GridItem
                  key={media.id}
                  colSpan={[2, 1, 1, 1, 1][index]}
                  rowSpan={[2, 1, 1, 1, 1][index]}
                  position="relative"
                  cursor="pointer"
                  onClick={() => openMediaViewer(media)}
                >
                  <ResponsiveMedias
                    medias={media}
                    currentDevice={deviceName}
                    style={{ borderRadius: 5, objectFit: 'cover' }}
                    fill
                    width={undefined}
                    height={undefined}
                  />
                  {index === 4 && mediasData?.medias?.length > 5 && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bgColor="rgba(0,0,0,0.5)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="5px"
                    >
                      <Text color="white" fontSize="32px" fontWeight="medium">
                        +{mediasData?.medias?.length - 5}
                      </Text>
                    </Box>
                  )}
                </GridItem>
              ))}
            </Grid>
          )}
          <Box p={5}>
            <TranslatedString
              fontSize="40px"
              fontWeight="bold"
              color="black"
              text={room?.title}
            />
            <Text
              mt={-2}
              fontFamily="heading"
              fontSize="16px"
              color="black"
              fontWeight={700}
            >
              {specs?.area} · {specs?.peoplesNumber} personnes · {specs?.bed}
            </Text>
            <Box mt={6}>
              {[
                {
                  title: 'Vue sur la mer',
                  icon: null,
                  description:
                    "Depuis votre balcon profitez d'une vue incroyable sur l'Océan Pacifique.",
                },
                {
                  title: 'Petit déjeuner continental',
                  icon: null,
                  description:
                    'En chambre ou au bord de la piscine, prenez votre petit déjeuner continental offert avec votre séjour.',
                },
                {
                  title: "Produits d'accueil",
                  icon: null,
                  description:
                    "Shampooing, gels douche, savons, soins cosmétiques, laits corps, etc... tout le nécessaire grâce à nos produits d'accueil.",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  fontSize="14px"
                  borderTopWidth={index !== 0 ? '1px' : 0}
                  borderColor="gray.200"
                  py={3}
                >
                  <Text fontFamily="heading" fontWeight="700" color="black">
                    {item.title}
                  </Text>
                  <Text fontFamily="heading" fontWeight="400" color="gray.500">
                    {item.description}
                  </Text>
                </Box>
              ))}
            </Box>
            <ExpandableText mt={10} noOfLines={6}>
              {description && (
                <RichText
                  fontFamily="heading"
                  fontWeight="400"
                  color="gray.500"
                  text={description.text}
                />
              )}
            </ExpandableText>
            <RoomStuff stuff={stuff} />
          </Box>
        </Box>
      </Box>
      {mediasData && (
        <MediasViewer
          medias={mediasData.medias}
          currentMedia={currentMediaViewer}
          isOpen={!!currentMediaViewer}
          onClose={() => setCurrentMediaViewer(undefined)}
        />
      )}
    </Drawer>
  );
};

export default RoomPage;
