import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getDirname = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  return dirname(__filename);
};
