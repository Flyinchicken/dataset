import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('dataset')
export class DatasetController {
    constructor(private readonly datasetService: DatasetService) { }

    @Get()
    parseCSV() {
        return this.datasetService.parseCSV();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadCSV(@UploadedFile() file: Express.Multer.File, @Body('details') detail) {
        return this.datasetService.uploadCSV(file, detail);
    }
}
