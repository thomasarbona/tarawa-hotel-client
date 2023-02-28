import IconIgComments from '@/../public/icons/instagram-comment.svg';
import IconIgHeart from '@/../public/icons/instagram-heart.svg';
import IconIgSave from '@/../public/icons/instagram-save.svg';
import IconIgSend from '@/../public/icons/instagram-send.svg';
import Image from 'next/image';
import ImgIgName from '@/../public/images/home/instagram-logo.png';
import ResponsiveMedias from '@/lib/kustom-client-sdk/components/ResponsiveMedias';
import RichText from '@/lib/kustom-client-sdk/components/RichText';
import randomIntFromInterval from '@/helpers/randomIntFromInterval';
import useResponsiveMediasDevice from '@/lib/kustom-client-sdk/hooks/useResponsiveMediasDevice';
import React, { useMemo, useRef, useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  KustomPageComponent,
  TestimonyComponentData,
} from '@/lib/kustom-client-sdk/types';

interface ReviewsProps {
  component: KustomPageComponent<TestimonyComponentData>;
}

const Reviews: React.FC<ReviewsProps> = (props) => {
  const { component } = props;

  const slides = component?.data?.slides;

  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const currentDevice = useResponsiveMediasDevice();

  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const posts = useMemo(
    () =>
      slides?.map((slide) => ({
        id: slide?.id,
        description: slide?.description,
        author: slide?.author,
        date: slide?.publishDate,
        media: slide?.medias,
        likes: randomIntFromInterval(100, 600),
        isSlider: randomIntFromInterval(0, 2) > 1,
      })),
    [slides],
  );

  const [postWidth, postHeight, postMarginRight] = useBreakpointValue({
    base: [mediaContainerRef.current?.clientWidth || 260, 480, -20],
    sm: [389, 480, -20],
    md: [389, 480, -20],
    lg: [389, 480, 20],
  }) as number[];

  console.log(postMarginRight);

  const postDist = postWidth + postMarginRight;

  const next = () => {
    if (currentPostIndex === posts?.length - 1) {
      setCurrentPostIndex(0);
    } else {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  const prev = () => {
    if (currentPostIndex === 0) {
      setCurrentPostIndex(posts?.length - 1);
    } else {
      setCurrentPostIndex(currentPostIndex - 1);
    }
  };

  return (
    <Box
      bgColor="gray.100"
      py={[28, null, null, 60]}
      pb={[40, null, null, 60]}
      onClick={() => next()}
      display="flex"
      overflowX="hidden"
      px={10}
    >
      <Container maxW="container.xl" position="relative" px={3.5}>
        <Box
          position="absolute"
          top="-20"
          left="0"
          right={0}
          display="flex"
          h="672px"
        >
          {/* SMARTPHONE DISPLAY */}
          <Box
            display={['none', null, null, 'block']}
            bgColor="white"
            w="414px"
            px={3.5}
            boxShadow="0px 0px 99px #00000029"
            borderRadius="xl"
          >
            <Box h="20" display="flex" alignItems="center">
              <Image src={ImgIgName} width={42} alt="instagram" />
              <Text
                ml={2}
                fontFamily="SF UI Display"
                color="black"
                fontSize="16px"
                fontWeight="bold"
              >
                Tarawa Hotel
              </Text>
            </Box>
            <Box
              w={postWidth + 'px'}
              h={postHeight + 'px'}
              borderRadius="lg"
              bgColor="gray.100"
            ></Box>
            <Box px={1}>
              <Box
                pt={5}
                position="relative"
                display="flex"
                justifyContent="space-between"
              >
                <SimpleGrid columns={3} spacing={4}>
                  <IconIgHeart />
                  <IconIgComments />
                  <IconIgSend />
                </SimpleGrid>
                {posts[currentPostIndex]?.isSlider && (
                  <SimpleGrid
                    position="absolute"
                    columns={4}
                    spacing={1.5}
                    left="50%"
                    top="50%"
                    transform={'translate(-50%, 50%)'}
                  >
                    <Box
                      w="8px"
                      h="8px"
                      bgColor="cyan.500"
                      borderRadius="full"
                    ></Box>
                    <Box
                      w="8px"
                      h="8px"
                      bgColor="gray.200"
                      borderRadius="full"
                    ></Box>
                    <Box
                      w="8px"
                      h="8px"
                      bgColor="gray.200"
                      borderRadius="full"
                    ></Box>
                    <Box
                      w="8px"
                      h="8px"
                      bgColor="gray.200"
                      borderRadius="full"
                    ></Box>
                  </SimpleGrid>
                )}
                <IconIgSave />
              </Box>
              <Box py={3}>
                <Text
                  fontFamily="SF UI Display"
                  color="black"
                  fontSize="13px"
                  fontWeight="bold"
                >
                  {posts[currentPostIndex]?.likes} likes
                </Text>
              </Box>
            </Box>
          </Box>
          <Box overflow="hidden" position="relative" zIndex={1} w="100%">
            <Box
              top={`calc(-100% * ${currentPostIndex})`}
              position="relative"
              transition="top 0.4s ease"
            >
              {slides?.map((slide) => (
                <Box
                  pl={[0, null, null, 40]}
                  key={slide.id}
                  h="672px"
                  display="flex"
                  alignItems="center"
                >
                  <Box w="100%">
                    <Box h="20" display={['none', null, null, 'block']}></Box>
                    <Box
                      h={[null, null, null, postHeight + 'px']}
                      display="flex"
                      alignItems="center"
                      maxW={[null, null, null, '50vw']}
                    >
                      <RichText
                        fontWeight="bold"
                        color="black"
                        fontSize={['42px', null, null, null, '62px']}
                        text={slide?.description}
                      />
                    </Box>
                    <Box
                      fontSize={['28px', null, null, '36px']}
                      color="black"
                      display="flex"
                      mt={6}
                    >
                      <Text fontFamily="fantasy">- {slide?.author}</Text>
                      <Text fontFamily="fantasy" ml={5}>
                        {slide?.publishDate}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box flexShrink={0} ref={mediaContainerRef}>
          <Box
            pr={20}
            display="flex"
            flexWrap="nowrap"
            position="relative"
            transition="left 0.4s ease"
            left={-postDist * currentPostIndex + 'px'}
          >
            {posts?.map((post, index) => (
              <Box
                key={post.id}
                w={postWidth + 'px'}
                h={postHeight + 'px'}
                flexShrink={0}
                position="relative"
                overflow={'hidden'}
                mr={[postMarginRight + 'px']}
                transition="all 0.4s ease"
                opacity={[
                  0.15,
                  null,
                  null,
                  index === currentPostIndex ? 1 : 0.15,
                ]}
                borderRadius="lg"
                transform={[
                  `scale(${index === currentPostIndex ? 1 : 0.7})`,
                  null,
                  null,
                  'scale(1)',
                ]}
              >
                <ResponsiveMedias
                  currentDevice={currentDevice}
                  medias={post.media}
                  style={{
                    objectFit: 'cover',
                  }}
                  fill
                  width={undefined}
                  height={undefined}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;
