import { put } from '@vercel/blob';
 
export default async function handler(request, response) {
  const blob = await put(request.query.filename, request, {
    access: 'public',
  });
 
  return response.status(200).json(blob);
}
 
export const config = {
  api: {
    bodyParser: false,
  },
};
