import NextImage from 'next/image';
import type { ImageProps } from 'next/image';

export type Props = {
  name: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  layout?: string;
} & Omit<ImageProps, 'src' | 'width' | 'height' | 'name' | 'layout'>;

const imageHost = {
  local: '../../public/assets/icons',
};

/** 이미지 컴포넌트 */
const Image = ({ name, size, width, height, layout, ...rest }: Props) => {
  return (
    <NextImage
      src={`${imageHost.local}/${name}`}
      width={size || width}
      height={size || height}
      layout="fixed"
      priority
      draggable={false}
      {...rest}
    />
  );
};

export default Image;
