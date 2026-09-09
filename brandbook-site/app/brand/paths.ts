/**
 * Public asset URLs are rooted in the deployment surface. GitHub Pages serves
 * this site below the repository URL `/fusionstructure-web/`, while
 * local previews and the hosted site use the root. Keeping the prefix in one
 * helper prevents public mockups and downloads from silently falling back to
 * the domain root.
 */
declare const __FS_PUBLIC_BASE_PATH__: string | undefined;

const configuredBasePath =
  typeof __FS_PUBLIC_BASE_PATH__ !== 'undefined'
    ? __FS_PUBLIC_BASE_PATH__
    : typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : '';

export const PUBLIC_BASE_PATH = configuredBasePath.replace(/\/$/, '');

export const publicAsset = (path: string) =>
  `${PUBLIC_BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
