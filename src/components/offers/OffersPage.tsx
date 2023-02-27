import Drawer from 'react-modern-drawer';
import Image from 'next/image';
import Link from 'next/link';
import PagesContext from '@/contexts/pages';
import TranslatedString from '@/lib/kustom-client-sdk/components/TranslatedString';
import React, { useContext, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface OffersPageProps {}

const OffersPage: React.FC<OffersPageProps> = (props) => {
  const {} = props;

  const router = useRouter();
  const pages = useContext(PagesContext);

  const route = router.asPath.split('#')[1];

  const isOpen = route === 'offres';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const breakpoint = useBreakpoint();

  const [offersSize] = useBreakpointValue({
    base: [300],
    lg: [300],
    xl: [496],
  }) as [number];

  const close = () => {
    router.push(router.asPath.split('#')[0]);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      direction="right"
      size={breakpoint === 'base' ? '100%' : offersSize + 'px'}
      style={{ maxWidth: '100vw' }}
      enableOverlay
    >
      <Box
        px={6}
        maxH="100%"
        overflowY="scroll"
        bgColor="gray.100"
        minHeight="100vh"
      >
        <Heading pt={10} fontWeight="bold" fontSize="28px" mb={4} ml={2}>
          Nos Offres et packages
        </Heading>
        {pages.offers.map((offer) => {
          const defaultMedia = offer.medias?.[0];

          console.log(offer);

          return (
            <Link
              key={offer._id}
              href={
                (offer.buttonAction === 'EMAIL' ? 'mailto:' : '') +
                (offer.buttonActionString || '#')
              }
            >
              <Box
                h={['300px', null, null, null, '400px']}
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
                // onClick={() => goToRoom(room)}
              >
                {defaultMedia?.url && (
                  <Image
                    alt="room"
                    src={defaultMedia?.url}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
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
                  <Box
                    bgColor="#D26262"
                    fontSize="12px"
                    display="inline-block"
                    px={3}
                    py={0.5}
                    borderRadius="full"
                    mb={2}
                  >
                    {offer.theme}
                  </Box>
                  <TranslatedString
                    fontWeight="bold"
                    fontSize="24px"
                    color="white"
                  >
                    {offer.title}
                  </TranslatedString>
                  <Text color="white" fontSize="16px">
                    {offer.isPriceFrom ? 'À partir de ' : ''}
                    {offer.price}€ {offer.priceDetails}
                  </Text>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default OffersPage;
