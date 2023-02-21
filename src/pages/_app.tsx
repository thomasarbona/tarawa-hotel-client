import '@/styles/globals.css';

import App from 'next/app';
import Description from '@/components/home/Description';
import Head from 'next/head';
import OceanSection from '@/components/home/OceanSection';
import Timeline from '@/components/home/Timeline';
import chakraTheme from '@chakra-ui/theme';
import getKustomClientInstance from '@/kustomClient';
import theme from '@/theme';
import type { AppProps as _AppProps } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { KustomRoutes } from '@/lib/kustom-client-sdk/types';
import { PagesContextProvider } from '@/contexts/pages';
import { ParallaxProvider } from 'react-scroll-parallax';
import { registerKustomComponent } from '@/lib/kustom-client-sdk/components/KustomComponent';
import { useRef } from 'react';

// import loaderAnimationData from '../lotties/loader.json';

const { Button } = chakraTheme.components;

// const loaderLottieOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: loaderAnimationData,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice',
//   },
// };

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

type AppProps = _AppProps & {
  routes: KustomRoutes;
};

const _App = (props: AppProps) => {
  const { Component, pageProps, routes } = props;
  // const { routes } = pageProps;

  const wrapperRef = useRef<HTMLDivElement>(null);
  // const [areImagesLoaded, imagesLoadingProgress] =
  //   useImageLoadingStatus(wrapperRef);

  // console.log('areImagesLoaded', areImagesLoaded, imagesLoadingProgress);

  return (
    <>
      {/* {!areImagesLoaded && (
        <Box
          className="lottie"
          zIndex={9999}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgColor="white"
        >
          <Lottie options={loaderLottieOptions} height={100} width={100} />
          <Progress value={imagesLoadingProgress} />
        </Box>
      )} */}
      <Head>
        <title>Tarawa Hotel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={wrapperRef}>
        <ChakraBaseProvider theme={theme}>
          <ParallaxProvider>
            <PagesContextProvider routes={routes}>
              <Component {...pageProps} />
            </PagesContextProvider>
          </ParallaxProvider>
        </ChakraBaseProvider>
      </div>
    </>
  );
};

_App.getInitialProps = async (context: any) => {
  const pageProps = await App.getInitialProps(context);
  const kustomClient = getKustomClientInstance();
  const routes = await kustomClient.getRoutes();

  return {
    ...pageProps,
    routes,
  };
};

export default _App;
