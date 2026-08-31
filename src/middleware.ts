import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  // 1. WWW -> non-WWW 301 Permanent Redirect
  if (hostname === 'www.insureestimate.com') {
    url.hostname = 'insureestimate.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // Execute request to get page response
  const response = await next();

  // 2. Add X-Robots-Tag: noindex for Cloudflare Workers URLs (*.workers.dev)
  // This matches both production (insureestimate.veerpreps.workers.dev)
  // and preview (*-insureestimate.veerpreps.workers.dev) hostnames.
  if (hostname.endsWith('.workers.dev')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Robots-Tag', 'noindex');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
});
