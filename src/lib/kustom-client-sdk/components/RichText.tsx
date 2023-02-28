import { Box, BoxProps } from '@chakra-ui/react';
import { useContext } from 'react';

import LanguageContext from '../contexts/language';
import { KustomTranslatedStrings, Text } from '../types';

interface RichTextProps extends BoxProps {
  text: KustomTranslatedStrings;
}

const RichText = (props: RichTextProps) => {
  const { text, ...boxStyle } = props;

  const language = useContext(LanguageContext);

  const renderString = text[language.currentLang] || text.fr;

  return (
    <Box {...boxStyle} dangerouslySetInnerHTML={{ __html: renderString }} />
  );
};

export default RichText;
