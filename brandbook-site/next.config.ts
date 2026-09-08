import type { NextConfig } from 'next';

const githubPagesBuild = process.env.BRANDBOOK_GITHUB_PAGES === '1';

const nextConfig: NextConfig = githubPagesBuild
  ? {
      output: 'export',
      // The repository prefix is supplied by GitHub Pages; the brandbook is
      // published below this branch-level subdirectory.
      assetPrefix: '/brandbook',
      trailingSlash: true,
    }
  : {};

export default nextConfig;
