import { Box, BoxProps } from '@chakra-ui/react';

import { Text } from '../../types';

interface AtomicTextProps extends BoxProps {
  text: Text;
}

const AtomicText = (props: AtomicTextProps) => {
  const { text, ...boxStyle } = props;

  return (
    <Box {...boxStyle} dangerouslySetInnerHTML={{ __html: text?.text?.fr }} />
  );
};

export default AtomicText;
