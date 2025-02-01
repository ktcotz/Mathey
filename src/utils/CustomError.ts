type CustomErrorConfig = {
  message: string;
  code?: number;
};

export class CustomError extends Error {
  private errors: Record<string | number, string> = {
    'Invalid login credentials':
      'Nie ma takiego użytkownika, albo wprowadziłeś błędne dane.',
    'User already registered':
      'Użytkownik z podanym emailem jest już w naszej bazie.',
  };

  constructor(protected config: CustomErrorConfig) {
    super(config.message);

    console.log(this.config);

    this.name = 'CustomError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  generateMessage(): string {
    if (!this.config.message || !this.errors[this.config.message]) {
      return 'Niespodziewany error, spróbuj ponownie za chwilę.';
    }

    return this.errors[this.config.message];
  }
}
