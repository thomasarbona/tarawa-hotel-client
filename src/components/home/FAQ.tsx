import IconCard from '@/../public/icons/card.svg';
import IconClock from '@/../public/icons/clock.svg';
import IconSpa from '@/../public/icons/spa.svg';
import RichText from '@/lib/kustom-client-sdk/components/RichText';
import TranslatedString from '@/lib/kustom-client-sdk/components/TranslatedString';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import {
  AccordionComponentData,
  KustomPageComponent,
} from '@/lib/kustom-client-sdk/types';

interface FAQProps {
  component: KustomPageComponent<AccordionComponentData>;
}

const MAX_SLIDES = 5;

const FAQ: React.FC<FAQProps> = (props) => {
  const { component } = props;

  const [seeMore, setSeeMore] = useState(false);

  const slides = seeMore
    ? component.data.slides
    : component.data.slides.slice(0, MAX_SLIDES);

  return (
    <Box minH="200px" display="flex" bgColor="gray.100" pb={20}>
      <Container
        maxW="container.xl"
        display="flex"
        flexDir={['column', null, null, null, 'row']}
      >
        <Heading
          textAlign={'center'}
          maxW={[null, null, null, '60vw', '40vw']}
          fontSize={['40px', null, '60px', '72px']}
          color="black"
          lineHeight={1}
          fontWeight="bold"
          mb={20}
        >
          Informations pratiques
        </Heading>
        <Box flex={3} px={[5, null, null, null, 0]}>
          <Accordion allowToggle>
            {slides.map((slide, index) => (
              <AccordionItem
                key={slide.id}
                borderTop={index === 0 ? 'none' : undefined}
                borderBottom={index === slides.length - 1 ? 'none' : undefined}
              >
                <h2>
                  <AccordionButton pb={4}>
                    <Box as="span" flex="1" textAlign="left">
                      <TranslatedString
                        fontSize="24px"
                        fontFamily="heading"
                        fontWeight="700"
                      >
                        {slide.text}
                      </TranslatedString>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RichText
                    fontSize="24px"
                    fontFamily="heading"
                    text={slide.hiddenText}
                  />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          {MAX_SLIDES < component.data.slides.length && (
            <Button
              colorScheme="brand"
              px={5}
              py={6}
              mt={4}
              ml={2}
              onClick={() => setSeeMore((s) => !s)}
            >
              {!seeMore ? 'Plus de questions' : 'Moins de questions'}
            </Button>
          )}
        </Box>
        <Box
          flex={2}
          pl={[10, null, null, null, 40]}
          pr={[10, null, null, null, 0]}
          mt={[16, null, null, null, 0]}
          maxW={[null, null, '60vw', '40vw']}
        >
          {[
            {
              title: "Horaires d'ouverture",
              text: '7/7 jours 09h - 13h | 14h - 20h Votre chambre devra être libérée à 12h30 au plus tard le jour de votre départ.',
              icon: <IconClock />,
            },
            {
              title: 'Moyens de règlement',
              text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.',
              icon: <IconCard />,
            },
            {
              title: 'Accès au spa',
              text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
              icon: <IconSpa />,
            },
          ].map((item, index) => (
            <Box
              key={item.title}
              mb={6}
              pt={index === 0 ? 0 : 6}
              borderTop={index === 0 ? 'none' : '1px solid'}
              borderColor="gray.200"
            >
              {item.icon}
              <Text
                mt={2}
                mb={4}
                fontFamily="heading"
                fontSize="24px"
                color="black"
                fontWeight={700}
              >
                {item.title}
              </Text>
              <Text fontFamily="heading" fontSize="24px" color="black">
                {item.text}
              </Text>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
