export default function getImageUrl(
  name: string,
  extension: 'png' | 'jpg' | 'jpeg' | 'gif' | 'avif' | 'svg'
) {
  return new URL(`../../public/${name}.${extension}`, import.meta.url).href;
}
