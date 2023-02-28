import IconDiadao from '@/../public/icons/diadao.svg';
import IconLang from '@/../public/icons/translate.svg';
import Image from 'next/image';
import Link from 'next/link';
import LogoFooter from '@/../public/images/logo-footer.png';
import LanguageContext, {
  LanguageContextKey,
} from '@/lib/kustom-client-sdk/contexts/language';
import React, { useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface FooterProps {}

const langs = [
  { key: 'fr', label: 'Français' },
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Spanish' },
];

const Footer: React.FC<FooterProps> = (props) => {
  const {} = props;

  const language = useContext(LanguageContext);

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
          pb={[28, null, null, null, 12]}
          alignItems="center"
          flexDir={['column', null, null, null, 'row']}
        >
          <Box
            fontSize="18px"
            w={['100%', null, null, null, 'unset']}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Menu>
              <MenuButton
                fontSize="14px"
                px={5}
                as={Button}
                borderRadius="full"
                border="1px solid"
                borderColor="gray.200"
                leftIcon={<IconLang />}
              >
                {langs.find((lang) => lang.key === language.currentLang)?.label}
              </MenuButton>
              <MenuList fontSize="14px" bgColor="gray.100">
                {langs.map((lang) => (
                  <MenuItem
                    bgColor="gray.100"
                    key={lang.key}
                    onClick={() => {
                      language.setCurrentLang(lang.key as LanguageContextKey);
                    }}
                  >
                    {lang.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Text ml={4}>© 2023 Tarawa Hotel</Text>
          </Box>
          <Box fontSize="16px" mt={[10, null, null, null, 0]}>
            <Stack
              direction={['column', null, null, null, 'row']}
              spacing={4}
              justify="flex-end"
              textAlign={['center', null, null, null, 'left']}
            >
              <Link href="#">Politique de confidentialité</Link>
              <Link href="#">Cookies</Link>
              <Link href="#">FAQ</Link>
              <Link href="#">Plan du site</Link>
              <Link
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
