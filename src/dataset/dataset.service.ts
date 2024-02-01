import { ForbiddenException, Injectable } from '@nestjs/common';
import { DataFrame, pl } from 'nodejs-polars'
import { ExprOrString } from 'nodejs-polars/bin/utils';
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

    uploadCSV(file: Express.Multer.File, details) {
        const datasetDetails = JSON.parse(details);
        // file received through the network is stored in memory buffer which can be converted to string without any problem
        const csvString = file.buffer.toString();

        // udsv provided methods to infer the schema from the csv string
        let schema = inferSchema(csvString);
        // construct the parser according to the schema
        let parser = initParser(schema);
        // the parser takes the string and return the desire type of processed object
        let typedObjs = parser.typedObjs(csvString);

        // the above code return an object of records so that nodejs polars can use as an input and construct the dataframe
        // choosing polars because we want fast computation of column summaries
        const df = pl.readRecords(typedObjs);


        // check for primary keys constraint
        if (!this.primaryKeyCheck(datasetDetails.primaryKeys, df)) {
            throw new ForbiddenException('There are replications of rows with the same set of primary keys!')
        }

        return df.toRecords();
    }

    private primaryKeyCheck(primaryKeys: string[], df: pl.DataFrame) {
        const checkPrimaryKeysArray = df.select(...primaryKeys).isUnique().toArray();
        return checkPrimaryKeysArray.reduce((prev, curr) => prev && curr);
    }
}
