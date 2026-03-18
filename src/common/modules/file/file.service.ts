import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  handleFile(file: Express.Multer.File) {
    // Implement your logic to handle the uploaded file
    return {
      message: 'File uploaded successfully',
      filePath: file.path,
    };
  }
}
