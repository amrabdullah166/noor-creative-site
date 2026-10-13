// Cloudflare Pages Function → /api/chat
import { handleChat } from '../../lib/chat-core.js';
export const onRequest = ({ request, env }) => handleChat(request, env);
