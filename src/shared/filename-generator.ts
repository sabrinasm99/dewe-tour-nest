import { extname } from 'path';

const filenameGenerator = function (fieldname, originalname) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(originalname);
  const filename = `${fieldname}-${uniqueSuffix}${ext}`;

  return filename;
};

export default filenameGenerator;
