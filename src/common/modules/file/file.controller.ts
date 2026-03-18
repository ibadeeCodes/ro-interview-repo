import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Roles } from '../../decorators/roles.decorator';
import { ROLE } from '../../constants';
import { RolesGuard } from '../../guards/role.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  // @Post('upload')
  // @Roles(ROLE.SUPER_ADMIN, ROLE.USER)
  // @UseGuards(RolesGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return this.fileService.handleFile(file);
  // }
}
