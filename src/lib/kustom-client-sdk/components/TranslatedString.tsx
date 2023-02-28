import React, { useContext } from 'react';
import { Box, Heading, Text, TextProps } from '@chakra-ui/react';

import LanguageContext from '../contexts/language';
import { KustomTranslatedStrings } from '../types';

interface TranslatedStringProps extends Omit<TextProps, 'children'> {
  text?: KustomTranslatedStrings;
  isHeading?: boolean;
  children?: KustomTranslatedStrings;
}

const TranslatedString: React.FC<TranslatedStringProps> = (props) => {
  const { text, isHeading, children, ...textProps } = props;

  const TextComponent = isHeading ? Heading : Text;

  const language = useContext(LanguageContext);

  if (!text && !children) return null;

  const renderText = (text || children) as KustomTranslatedStrings;

  const renderString = renderText[language.currentLang] || renderText.fr;

  return <TextComponent {...textProps}>{renderString}</TextComponent>;
};

export default TranslatedString;
