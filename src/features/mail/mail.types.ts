export type MailTemplates = 'welcome' | 'notify';

export type WelcomeMailContent = {
  email: string;
};

export type NotifyMailContent = {
  test: string;
};

export type EmailTemplateContents = {
  welcome: WelcomeMailContent;
  notify: NotifyMailContent;
};

export type KeyTemplates = keyof EmailTemplateContents;
