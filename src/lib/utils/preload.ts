export async function preload(src: string) {
  // preload the image
  const image = new Image();
  image.src = src;
}
