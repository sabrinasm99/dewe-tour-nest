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
import multerOptions from 'src/shared/multer-option';

@Controller()
export class UploadPaymentProofController {
  constructor(
    @Inject(UPLOAD_PAYMENT_PROOF_HANDLER)
    private handler: UploadPaymentProofHandler,
  ) {}

  @Post('/transactions/:id/upload')
  @UseInterceptors(FileInterceptor('attachment', multerOptions))
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

    await this.handler.execute({ id, attachment: file.filename });

    return { message: 'Success', data: { id } };
  }
}
