import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhotoValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      return undefined; // Skip validation if file is not provided
    }
    if (file.size > 10000) {
      throw new BadRequestException('Photo upload exceeds the maximum allowed size of 10KB');
    }
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Uploaded file is not a valid image');
    }
    return file;
  }
}
