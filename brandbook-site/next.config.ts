import type { NextConfig } from 'next';

const githubPagesBuild = process.env.BRANDBOOK_GITHUB_PAGES === '1';
const githubPagesBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH || '/FusionStructureBrand';

const nextConfig: NextConfig = githubPagesBuild
  ? {
      output: 'export',
      // GitHub Pages project sites are served below the repository path. The
      // same prefix is used for chunks and public assets so Safari and mobile
      // browsers never resolve them against the domain root.
      assetPrefix: githubPagesBasePath,
      trailingSlash: true,
    }
  : {};

export default nextConfig;
