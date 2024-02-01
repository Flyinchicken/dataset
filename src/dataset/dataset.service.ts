import { Injectable } from '@nestjs/common';
import { pl } from 'nodejs-polars'

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
}
