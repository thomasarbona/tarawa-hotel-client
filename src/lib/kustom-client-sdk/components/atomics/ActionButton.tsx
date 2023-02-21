import Link from 'next/link';
import { Button, ButtonProps, chakra } from '@chakra-ui/react';

import { ActionButton } from '../../types';

interface AtomicActionButtonProps extends ButtonProps {
  button: ActionButton;
}

const AtomicActionButton = (props: AtomicActionButtonProps) => {
  const { button, ...buttonProps } = props;

  const isEmail = button.action === 'EMAIL';

  const LinkComponent =
    isEmail ||
    button.action === 'LINK_EXTERNAL' ||
    button.action === 'LINK_TO_BE' ||
    button.target
      ? chakra.a
      : Link;

  return (
    <LinkComponent
      href={(isEmail ? 'mailto:' : '') + button.actionString || ''}
      target={button.target}
    >
      <Button {...buttonProps}>{button.label?.fr}</Button>
    </LinkComponent>
  );
};

export default AtomicActionButton;
