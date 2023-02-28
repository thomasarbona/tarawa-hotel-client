import Description from '@/components/home/Description';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/home/Footer';
import Head from 'next/head';
import Image from 'next/image';
import ImageSmooth from '@/components/atomics/ImageSmooth';
import Lottie from 'react-lottie';
import Menu from '@/components/Menu';
import OceanSection from '@/components/home/OceanSection';
import Offers from '@/components/home/Offers';
import OffersPage from '@/components/offers/OffersPage';
import PagesContext from '@/lib/kustom-client-sdk/contexts/pages';
import Reviews from '@/components/home/Reviews';
import RoomsPages from '@/components/rooms/RoomsPages';
import Slideshow from '@/components/home/Slideshow';
import Timeline from '@/components/home/Timeline';
import mainBackground from '@/../public/images/home/main.jpeg';
import KustomComponent, {
  registerKustomComponent,
} from '@/lib/kustom-client-sdk/components/KustomComponent';
import { Box, useBreakpointValue } from '@chakra-ui/react';
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

registerKustomComponent({
  id: '16762984189504962',
  Component: Timeline,
});

registerKustomComponent({
  id: '16762982216122046',
  Component: Description,
});

registerKustomComponent({
  id: '16769093415252527',
  Component: OceanSection,
});

registerKustomComponent({
  id: '16771692810902084',
  Component: Slideshow,
});

registerKustomComponent({
  id: '16771781401437166',
  Component: Offers,
});

registerKustomComponent({
  id: '16771811930783352',
  Component: Reviews,
});

registerKustomComponent({
  id: '16775089026965984',
  Component: FAQ,
});

export default function Home(props: any) {
  const pagesContext = useContext(PagesContext);

  const content = pagesContext.routes?.['/'];

  const logoWidth = useBreakpointValue({
    base: '120px',
    md: '200px',
  });

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
          <Logo width={logoWidth} />
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
        <Footer />
      </Box>
      <Menu />
      <RoomsPages />
      <OffersPage />
    </>
  );
}
