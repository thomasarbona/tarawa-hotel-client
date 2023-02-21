import Head from 'next/head';
import Image from 'next/image';
import ImageSmooth from '@/components/atomics/ImageSmooth';
import KustomComponent from '@/lib/kustom-client-sdk/components/KustomComponent';
import Lottie from 'react-lottie';
import Menu from '@/components/Menu';
import PagesContext from '@/contexts/pages';
import RoomsPages from '@/components/rooms/RoomsPages';
import mainBackground from '@/../public/images/home/main.jpeg';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';

import Logo from '../../public/images/logo.svg';
import loaderAnimationData from '../lotties/loader.json';

export const loaderLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Home(props: any) {
  const pagesContext = useContext(PagesContext);

  const content = pagesContext.routes?.['/'];

  return (
    <>
      <Box>
        <Head>
          <title>Tarawa Hotel</title>
        </Head>
        <Box
          w="100vw"
          h="100vh"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Logo width="200px" />
          <ImageSmooth
            src={mainBackground}
            alt="Tarawa Hotel Bg"
            fill
            style={{ objectFit: 'cover', zIndex: -1 }}
            placeholder="blur"
          />
        </Box>
        {content?.components?.map((component) => (
          <KustomComponent key={component.id} component={component} />
        ))}
      </Box>
      <Menu />
      <RoomsPages />
    </>
  );
}
