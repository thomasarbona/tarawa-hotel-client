import IconDiadao from '@/../public/icons/diadao.svg';
import Image from 'next/image';
import Link from 'next/link';
import LogoFooter from '@/../public/images/logo-footer.png';
import React from 'react';
import { Box, Container, Stack, Text, chakra } from '@chakra-ui/react';
interface FooterProps {}

const Footer: React.FC<FooterProps> = (props) => {
  const {} = props;

  return (
    <Box
      bgColor="gray.100"
      display="flex"
      flexDir="column"
      alignItems="center"
      fontFamily="heading"
      color="gray.800"
    >
      <Container
        maxW="container.xl"
        display="flex"
        alignItems="center"
        flexDir="column"
      >
        <Box w="82px" h="82px">
          <Image src={LogoFooter} alt={'logo footer'} />
        </Box>
        <Box
          mt={10}
          display="flex"
          w="100%"
          justifyContent="space-between"
          borderTop="1px solid"
          borderColor="gray.200"
          pt={6}
          pb={12}
          alignItems="center"
        >
          <Box fontSize="18px" flex={1}>
            <Text>© 2023 Tarawa Hotel</Text>
          </Box>
          <Box fontSize="16px">
            <Stack direction="row" spacing={4} justify="flex-end">
              <Link href="#">Politique de confidentialité</Link>
              <Link href="#">Cookies</Link>
              <Link href="#">FAQ</Link>
              <Link href="#">Plan du site</Link>
              <Link href="#" style={{ display: 'flex' }}>
                <chakra.span mr={2}>Website by Diadao</chakra.span>{' '}
                <IconDiadao pl={5} />
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
