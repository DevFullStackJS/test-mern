import * as fs from 'fs';

import { configs } from '../../data/constants/configs';
import { HttpStatus } from '../../data/constants/http-status';
import { Exception } from '../../service/middleware/exception-handler';

export const imageToBase64 = (path: string, custom = false) => {
  try {
    const { uploadDir } = configs;
    const fullPath = custom ? path : `${uploadDir}/${path}`;
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, { encoding: 'base64' });
    }

    throw new Exception(HttpStatus.BAD_REQUEST, 'Fichier image non trouvable');
  } catch (error) {
    return null;
  }
};
