export default function getImageUrl(
  name: string,
  extension: 'png' | 'jpg' | 'jpeg' | 'gif' | 'avif'
) {
  return new URL(`../../public/${name}.${extension}`, import.meta.url).href;
}
