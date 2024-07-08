import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileTypeValidatorPipe implements PipeTransform {
  constructor(private readonly allowedTypes: string[]) {}

  transform(files: {
    cover_image?: Express.Multer.File[];
    detailed_images?: Express.Multer.File[];
  }) {
    for (const key in files) {
      if (files[key]) {
        files[key].forEach((file) => {
          const fileExt = extname(file.originalname);
          if (!this.allowedTypes.includes(fileExt)) {
            throw new BadRequestException(`Invalid file type for ${key}`);
          }
        });
      }
    }
    return files;
  }
}
