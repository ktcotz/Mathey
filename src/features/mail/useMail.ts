import { useMutation } from '@tanstack/react-query';
import { sendEmail } from './services/services';
import { KeyTemplates } from './mail.types';

export const useMail = <T extends KeyTemplates>() => {
  const {
    mutate: mail,
    isPending: isSending,
    error,
  } = useMutation({
    mutationFn: sendEmail<T>,
  });

  return { mail, isSending, error };
};
