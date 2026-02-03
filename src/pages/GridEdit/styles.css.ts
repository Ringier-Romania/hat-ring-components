import type { APIRoute } from 'astro';
import css from './grid-edit.css?raw';

export const GET: APIRoute = () => {
  return new Response(css, {
    status: 200,
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      // 'Cache-Control': 'public, max-age=3600',
    },
  });
};
