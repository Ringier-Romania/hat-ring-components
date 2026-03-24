import type { APIRoute } from 'astro';
import loaderScript from './grid-edit-loader.js?raw';

export const GET: APIRoute = () => {
  return new Response(loaderScript, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      // 'Cache-Control': 'public, max-age=3600',
    },
  });
};
