type CustomErrorConfig = {
  message: string;
  code?: number;
};

export class CustomError extends Error {
  private errors: Record<number, string> = {
    400: 'Nie ma takiego użytkownika, popraw dane.',
  };

  constructor(protected config: CustomErrorConfig) {
    super(config.message);

    this.name = 'CustomError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  generateMessage(): string {
    if (!this.config.code || !this.errors[this.config.code]) {
      return 'Niespodziewany error, spróbuj ponownie za chwilę.';
    }

    return this.errors[this.config.code];
  }
}
