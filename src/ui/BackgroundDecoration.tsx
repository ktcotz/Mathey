import { Fragment } from 'react/jsx-runtime';

export function BackgroundDecoration() {
  return (
    <Fragment>
      <div className="animate-blob absolute left-10 top-10 h-20 w-20 rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-blue-700"></div>
      <div className="animate-blob animation-delay-2000 absolute right-20 top-0 h-24 w-24 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-purple-700"></div>
      <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-28 w-28 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-pink-700"></div>
      <div className="animate-blob animation-delay-6000 absolute bottom-20 right-10 h-32 w-32 rounded-full bg-green-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-green-700"></div>
    </Fragment>
  );
}
