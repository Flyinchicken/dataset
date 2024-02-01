import { Injectable } from '@nestjs/common';
import { DataFrame, pl } from 'nodejs-polars'
import { inferSchema, initParser } from 'udsv';

@Injectable()
export class DatasetService {
    parseCSV() {
        const mydata = {
            "a": 1,
            "b": 5251,
            "c": "1",
            "d": "1",
            "e": "1",
        };
        const myjson = JSON.stringify(mydata);
        const df = pl.readJSON(myjson);
        console.log(df.schema);
        console.log(df.columns)
        return df;
    }

    uploadCSV(file: Express.Multer.File, detail) {
        const csvString = file.buffer.toString();
        let schema = inferSchema(csvString);
        let parser = initParser(schema);
        let typedObjs = parser.typedObjs(csvString);
        const df = pl.readRecords(typedObjs);
        console.log(df.schema)
        return df;
    }
}
