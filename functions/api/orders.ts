import { handleRequest } from '../../server/handler';

// Cloudflare Pages serves only static files from dist/; this exposes the order API there.
export const onRequest = ({ request }: { request: Request }) => handleRequest(request);
