import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  Inject,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Express, Response } from 'express';
import { UploadPaymentProofHandler } from './upload-payment-proof.handler';
import { UPLOAD_PAYMENT_PROOF_HANDLER } from 'src/transactions/transaction.constants';
import filenameGenerator from 'src/shared/filename-generator';

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
    @Res({ passthrough: true }) res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { id } = req.params;

    const filename = filenameGenerator(file.fieldname, file.originalname);

    await this.handler.execute({
      id,
      attachment_filename: filename,
      attachment_buffer: file.buffer,
    });

    res.status(HttpStatus.OK);

    return { message: 'Success', data: { id } };
  }
}
