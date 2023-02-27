import { Box, BoxProps } from '@chakra-ui/react';

import { KustomTranslatedStrings, Text } from '../types';

interface RichTextProps extends BoxProps {
  text: KustomTranslatedStrings;
}

const RichText = (props: RichTextProps) => {
  const { text, ...boxStyle } = props;

  return <Box {...boxStyle} dangerouslySetInnerHTML={{ __html: text?.fr }} />;
};

export default RichText;
