import { diskStorage } from 'multer';
import { extname } from 'path';

const multerOptions = {
  storage: diskStorage({
    destination: 'images/payment-proof',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
};

export default multerOptions;
