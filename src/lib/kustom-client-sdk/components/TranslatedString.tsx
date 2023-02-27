import React from 'react';
import { Box, Heading, Text, TextProps } from '@chakra-ui/react';

import { KustomTranslatedStrings } from '../types';

interface TranslatedStringProps extends Omit<TextProps, 'children'> {
  text?: KustomTranslatedStrings;
  isHeading?: boolean;
  children?: KustomTranslatedStrings;
}

const TranslatedString: React.FC<TranslatedStringProps> = (props) => {
  const { text, isHeading, children, ...textProps } = props;

  const TextComponent = isHeading ? Heading : Text;

  if (!text && !children) return null;

  return (
    <TextComponent {...textProps}>{text?.fr || children?.fr}</TextComponent>
  );
};

export default TranslatedString;
