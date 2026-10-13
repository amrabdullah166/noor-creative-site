// Cloudflare Workers (static assets) entry: /api/chat → الشات، وباقي الطلبات → ملفات الموقع
import { handleChat } from './lib/chat-core.js';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat') return handleChat(request, env);
    return env.ASSETS.fetch(request);
  }
};
