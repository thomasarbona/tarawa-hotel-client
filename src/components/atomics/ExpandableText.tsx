import { Box, BoxProps, Button } from '@chakra-ui/react';
import { ReactNode, memo, useState } from 'react';

interface ExpandableTextProps extends BoxProps {
  noOfLines?: number;
  children: ReactNode;
}

export const ExpandableText = ({
  noOfLines = 4,
  children,
  ...boxProps
}: ExpandableTextProps) => {
  const [expandedCount, setExpandedCount] = useState<number | undefined>(
    noOfLines,
  );

  const handleToggle = () =>
    setExpandedCount(expandedCount ? undefined : noOfLines);

  const label = expandedCount ? 'En savoir plus' : 'Fermer';

  return (
    <Box display="inline-block" as="span" {...boxProps}>
      <Box noOfLines={expandedCount}>{children}</Box>
      <Button
        mt={4}
        size="sm"
        variant="link"
        fontWeight="bold"
        colorScheme="slate"
        textDecoration="underline"
        onClick={handleToggle}
      >
        {label}
      </Button>
    </Box>
  );
};

export default memo(ExpandableText);
