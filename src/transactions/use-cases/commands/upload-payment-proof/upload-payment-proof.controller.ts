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
