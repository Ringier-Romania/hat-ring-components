import type { APIRoute } from 'astro';
import dndScript from './grid-edit-dnd.js?raw';

export const GET: APIRoute = () => {
  return new Response(dndScript, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      // 'Cache-Control': 'public, max-age=3600',
    },
  });
};
