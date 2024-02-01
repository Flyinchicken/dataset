import { Controller, Get } from '@nestjs/common';
import { DatasetService } from './dataset.service';

@Controller('dataset')
export class DatasetController {
    constructor(private readonly datasetService: DatasetService) { }

    @Get()
    parseCSV() {
        return this.datasetService.parseCSV();
    }
}
