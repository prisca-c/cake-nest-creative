export const isImageUrl = (url: string): boolean => {
  const regex = new RegExp(
    /^(?:https?:\/\/)?(?:[\w-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|jpeg|gif|png|svg|webp)$/,
  );
  return regex.test(url);
};
