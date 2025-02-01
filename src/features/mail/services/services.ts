import { EmailTemplateContents, KeyTemplates } from '../mail.types';
import { API_URL } from './api';

export type MailData<T extends KeyTemplates> = {
  to: string;
  template: T;
  content: EmailTemplateContents[T] | object;
};

export const sendEmail = async <T extends KeyTemplates>({
  to,
  template,
  content = {},
}: MailData<T>) => {
  try {
    await fetch(`${API_URL}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        template,
        content,
      }),
    });
  } catch {
    return 'Prawdopodobnie masz problem z walidacją danych. Odwiedź dokumentację MathMailer!';
  }
};
