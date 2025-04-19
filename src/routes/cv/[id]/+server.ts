import { redirect, type RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folderPath = path.resolve(__dirname, '../../../lib/assets/cv/');

export const GET: RequestHandler = async ({ params }) => {
  if (params.id === undefined) {
    return redirect(302, '/');
  }

  const files = fs.readdirSync(folderPath);
  const fileName = files.find(f => f.startsWith(params.id as string));

  if (fileName === undefined) {
    return redirect(302, '/');
  }

  const pdfPath = path.resolve(__dirname, folderPath, fileName);
  const pdfBuffer = fs.readFileSync(pdfPath);

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="cv.pdf"',
    },
  });
};
