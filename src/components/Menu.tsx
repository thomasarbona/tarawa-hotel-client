import IconBurger from '@/../public/icons/burger.svg';
import IconCross from '@/../public/icons/cross.svg';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/../public/images/logo.svg';
import MediaActivitiesClose from '@/../public/images/menu/menu-decouvertes-activiteshotel.mp4';
import MediaActivitiesFar from '@/../public/images/menu/menu-decouvertes-activitesalentours.mp4';
import MediaEvents from '@/../public/images/menu/menu-experiences-events.jpg';
import MediaOffers from '@/../public/images/menu/menu-sejours-offres.jpg';
import MediaRestaurant from '@/../public/images/menu/menu-experiences-restaurant.mp4';
import MediaRooms from '@/../public/images/menu/menu-sejours-chambres.mp4';
import MediaSpa from '@/../public/images/menu/menu-experiences-spa.mp4';
import MediaSwimmingPool from '@/../public/images/menu/menu-experiences-piscine.mp4';
import MediaVouchers from '@/../public/images/menu/menu-experiences-bonscadeaux.jpg';
import {
  Box,
  Button,
  Fade,
  Heading,
  IconButton,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const menu = [
  {
    label: 'Séjours',
    routes: [
      { label: 'Chambres & Suites', href: '/#chambres', media: MediaRooms },
      {
        label: 'Offres spéciales',
        href: '/#offres',
        media: MediaOffers,
      },
    ],
  },
  {
    label: 'Expériences',
    routes: [
      { label: 'Restaurant', href: '/restaurant', media: MediaRestaurant },
      { label: 'Spa & Détente', href: '/spa-detente', media: MediaSpa },
      { label: 'Piscine', href: '/piscine', media: MediaSwimmingPool },
      { label: 'Événements', href: '/evenements', media: MediaEvents },
      { label: 'Bons cadeaux', href: '/bons-cadeaux', media: MediaVouchers },
    ],
  },
  {
    label: 'Découvertes',
    routes: [
      {
        label: 'Activités aux alentours',
        href: '/activites',
        media: MediaActivitiesClose,
      },
      {
        label: 'Activités à l’hôtel',
        href: '/activites',
        media: MediaActivitiesFar,
      },
    ],
  },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenuLabel, setHoveredMenuLabel] = useState<string>('');
  const [currentMenuMedia, setCurrentMenuMedia] = useState<
    StaticImageData | string | null
  >(null);
  const [isMenuMixBlended, setIsMenuMixBlended] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLarge] = useMediaQuery('(min-width: 48em)');

  useScrollPosition(({ currPos }) => {
    setIsMenuMixBlended(-currPos.y > 0);
  });

  useEffect(() => {
    videoRef.current?.load();
  }, [currentMenuMedia]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const open = (itemLabel?: string) => {
    setIsOpen(true);
    if (itemLabel) {
      setHoveredMenuLabel(itemLabel);
      setCurrentMenuMedia(
        menu.find((item) => item.label === itemLabel)?.routes[0].media || null,
      );
    }
  };
  const close = () => {
    setIsOpen(false);
    setHoveredMenuLabel('');
  };

  return (
    <>
      {/* MOBILE BURGER ICON */}
      <IconButton
        aria-label="Open menu"
        display={['block', null, 'none']}
        colorScheme="brand"
        position="fixed"
        bottom={0}
        left="50%"
        px={7}
        py={7}
        transform="translate(-50%, 0)"
        borderTopRadius="base"
        onClick={() => open()}
        h="auto"
        minW={0}
        borderBottomRadius="none"
        icon={<IconBurger width="21px" height="16px" />}
      />
      {/* DESKTOP MENU BAR */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        px={8}
        py={7}
        mixBlendMode={isMenuMixBlended ? 'difference' : undefined}
      >
        <Box display={['none', null, 'block']} mr={8}>
          <Link href="/">
            <Logo width="62px" />
          </Link>
        </Box>
      </Box>
      <Box>
        <Fade in={isOpen} unmountOnExit>
          <Box
            bgColor="black"
            opacity={0.7}
            position="fixed"
            top="0"
            right="0"
            left="0"
            bottom="0"
            onClick={close}
            onMouseEnter={close}
          ></Box>
        </Fade>
      </Box>
      {/* BLACK OVERLAY */}
      <Fade in={isLarge || isOpen} unmountOnExit>
        <Box
          position="fixed"
          top="0"
          left={[0, null, 120]}
          right="0"
          py={7}
          display={['block', null, 'flex']}
          mixBlendMode={isOpen || !isMenuMixBlended ? undefined : 'difference'}
        >
          <Box position="relative" display={['block', null, 'flex']}>
            {menu.map((item) => (
              <Box
                key={item.label}
                role="group"
                onMouseOver={isLarge ? () => open(item.label) : undefined}
                // onMouseLeave={isLarge ? close : undefined}
              >
                <Heading
                  color="white"
                  display={['none', null, 'block']}
                  px={5}
                  py={3}
                  pb={6}
                  cursor="pointer"
                  fontWeight="bold"
                  fontSize="16px"
                  _groupHover={{
                    textDecoration: 'underline',
                    textUnderlineOffset: '6px',
                    textDecorationThickness: '3px',
                  }}
                >
                  {item.label}
                </Heading>
              </Box>
            ))}
          </Box>
        </Box>
      </Fade>
      {/* MENU CONTENT */}
      <Fade in={isOpen} unmountOnExit>
        <Box
          display={isOpen ? 'block' : 'none'}
          position={'fixed'}
          top={[0, null, '80px']}
          left={[0, null, 120]}
          p={[5, null]}
          w={['100%', null, 'auto']}
          maxH="100vh"
          overflow="scroll"
        >
          {menu.map((item) => (
            <Box
              key={item.label}
              h={[null, null, '430px']}
              minW={[null, null, '972px']}
              bgColor="white"
              borderRadius="lg"
              px={[6, null, 10]}
              py={[6, null, 10]}
              mb={2}
              display={[
                'block',
                null,
                hoveredMenuLabel === item.label ? 'flex' : 'none',
              ]}
              justifyContent="space-between"
            >
              <Box>
                <Heading
                  fontSize="16px"
                  color="brand.500"
                  display={['block', null, 'none']}
                  textTransform="uppercase"
                  fontWeight="bold"
                  mb={4}
                  mt={4}
                >
                  {item.label}
                </Heading>
                {item.routes.map((route) => (
                  <Link href={route.href} key={route.label} onClick={close}>
                    <Text
                      key={route.label}
                      fontSize={['18px', null, '28px']}
                      my={[2, null, 3]}
                      _hover={{ color: 'brand.500' }}
                      fontWeight="bold"
                      onMouseEnter={() => {
                        setCurrentMenuMedia(route.media);
                      }}
                    >
                      {route.label}
                    </Text>
                  </Link>
                ))}
              </Box>
              <Box
                display={['none', null, 'block']}
                position="relative"
                h="100%"
                w="477px"
                borderRadius="lg"
                overflow="hidden"
                bgColor="black"
              >
                {currentMenuMedia &&
                  (!(typeof currentMenuMedia === 'string') ? (
                    <Image
                      src={currentMenuMedia}
                      alt="menu"
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <video
                      key={currentMenuMedia}
                      autoPlay
                      loop
                      muted
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    >
                      <source
                        src={currentMenuMedia as string}
                        type="video/mp4"
                      />
                    </video>
                  ))}
              </Box>
            </Box>
          ))}
          <Box justifyContent="center" display={['flex', null, 'none']} pb={28}>
            <IconButton
              aria-label="Close menu"
              mt={4}
              colorScheme="white"
              bgColor="white"
              p={5}
              px={5}
              borderRadius="full"
              onClick={close}
              h="auto"
              minW={0}
              icon={<IconCross width="19px" height="19px" />}
            />
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default Menu;
