import chakraTheme from '@chakra-ui/theme';
import { extendBaseTheme } from '@chakra-ui/react';

const { Button, Drawer } = chakraTheme.components;

const theme = extendBaseTheme({
  fonts: {
    heading: `'SamsungOne', sans-serif`,
    body: `'Samsung Sharp Sans', sans-serif`,
    fantasy: `'Tiger Walk', sans-serif`,
  },
  colors: {
    brand: {
      500: '#009F9F',
      600: '#007b7b',
    },
    gray: {
      100: '#F9F9F9',
      200: '#e4e4e4',
      800: '#3B3B3B',
    },
  },
  sizes: {
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1428px',
    },
  },
  components: {
    Drawer,
    Button: {
      ...Button,
      baseStyle: {
        ...Button.baseStyle,
        fontWeight: '500',
        fontSize: '16px',
        borderRadius: '3px',
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.800',
      },
    },
  },
});

export default theme;
