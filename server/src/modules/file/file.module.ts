import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from 'src/model/attachment.model';
import { getConfig } from 'src/utils';

const { MONGO } = getConfig();
@Module({
  imports: [TypeOrmModule.forFeature([Attachment], MONGO.NAME)],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
