//import '@testing-library/jest-dom';

// mock global pour eviter erreur fill et priority de next image
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props: any) => {
//     const { src, alt, fill, width, height, ...rest } = props;
//     const style = fill
//       ? { position: 'absolute', inset: 0, objectFit: 'cover' }
//       : { width, height };

//     // eslint-disable-next-line @next/next/no-img-element
//     return <img src={src} alt={alt} style={style} {...rest} />;
//   },
// }));

/* eslint-disable @next/next/no-img-element */
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      fill?: boolean;
      priority?: boolean;
    }
  ) => {
    const { src, alt, fill, width, height, priority, ...rest } = props;

    // Style en fonction du mode "fill" ou non
    const style: React.CSSProperties = fill
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: 'cover',
        }
      : {
          width: width ?? 'auto',
          height: height ?? 'auto',
        };

    // Sécurisation du type de src
    const imageSrc =
      typeof src === 'string'
        ? src
        : ((src as unknown as { src?: string })?.src ?? '');

    // Retourne un <img> classique pour Jest
    return (
      <img
        src={imageSrc}
        alt={alt || ''}
        style={style}
        data-priority={priority ? 'true' : 'false'}
        {...rest}
      />
    );
  },
}));
