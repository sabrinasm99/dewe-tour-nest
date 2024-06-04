import {
  Controller,
  FileTypeValidator,
  Inject,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadPaymentProofHandler } from './uploda-payment-proof.dto.request';
import { UPLOAD_PAYMENT_PROOF_HANDLER } from 'src/transactions/transaction.constants';
import filenameGenerator from 'src/shared/filename-generator';
import { writeFile } from 'fs/promises';

@Controller()
export class UploadPaymentProofController {
  constructor(
    @Inject(UPLOAD_PAYMENT_PROOF_HANDLER)
    private handler: UploadPaymentProofHandler,
  ) {}

  @Post('/transactions/:id/upload')
  @UseInterceptors(FileInterceptor('attachment'))
  async uploadProof(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { id } = req.params;

    const filename = filenameGenerator(file.fieldname, file.originalname);

    const filePath = `./images/payment-proof/${filename}`;

    await this.handler.execute({ id, attachment: file.filename });

    await writeFile(filePath, file.buffer);

    return { message: 'Success', data: { id } };
  }
}
