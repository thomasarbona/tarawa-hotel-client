import AtomicButton from '@/lib/kustom-client-sdk/components/atomics/ActionButton';
import AtomicText from '@/lib/kustom-client-sdk/components/RichText';
import {
  ActionButton,
  CustomComponentData,
  KustomPageComponent,
  Text as AtomicComponentText,
} from '@/lib/kustom-client-sdk/types';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

interface DescriptionProps {
  component: KustomPageComponent<CustomComponentData>;
}

const Description = (props: DescriptionProps) => {
  const { component } = props;

  const headline = component.data?.atomicComponents[0] as AtomicComponentText;
  const title = component.data?.atomicComponents[1] as AtomicComponentText;
  const description = component.data
    ?.atomicComponents[2] as AtomicComponentText;
  const button1 = component.data?.atomicComponents[3] as ActionButton;
  const button2 = component.data?.atomicComponents[4] as ActionButton;

  return (
    <Box display="flex" justifyContent="center" bgColor="white">
      <Container
        maxWidth="container.xl"
        display="flex"
        flexDir={['column', 'column', 'column', 'row']}
        px={8}
        my={20}
      >
        <Box flex={1}>
          <AtomicText
            fontFamily="fantasy"
            color="brand.500"
            fontSize={['32px', null, null, '48px']}
            text={headline?.text}
          />
          <AtomicText
            mt={[6, null]}
            fontWeight="bold"
            fontSize={['40px', null, null, '72px']}
            lineHeight={1}
            text={title?.text}
          />
        </Box>
        <Box flex={1}>
          <AtomicText
            mt={[6, null, null, 16]}
            fontSize={['24px', null, '36px']}
            fontFamily="heading"
            lineHeight="1.3"
            color="gray.800"
            fontWeight="500"
            text={description?.text}
          />
          <Box
            mt={[6, null, null, 6]}
            display="flex"
            flexDir={['column', null, null, 'row']}
          >
            <AtomicButton
              colorScheme="brand"
              button={button1}
              py={7}
              px={7}
              mr={4}
              mb={4}
            />
            <AtomicButton
              colorScheme="gray"
              variant="outline"
              button={button2}
              py={7}
              px={7}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Description;
