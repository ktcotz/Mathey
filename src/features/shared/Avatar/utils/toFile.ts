export const toFile = async (data: string) => {
  const blob = await fetch(data).then((res) => res.blob());

  const file = new File([blob], 'avatar.png', { type: 'image/png' });

  return file;
};
