import {Readable}    from "stream";
import {parseStream} from "./ipac_table";


const ipacTable = `
\\fixlen=T
|ra             |dec             |cntr             |
|double         |double          |int              |
  250.1300487     -1.053936        1                
  57.0076633      -1.5705005       2                
  56.726763       -1.630617        3                
  62.9312988      -0.7758149       4                
  62.9312988      -0.0008149       5                
`;


test('IPAC table test', () => {
    const input = Readable.from([ipacTable]);
    return parseStream({input}).then(table => {
        expect(table.totalRows).toBe(5);
        expect(table.tableMeta.fixlen).toBe('T');
        expect(table.tableData.data[0][0]).toBe(250.1300487);
        expect(table.tableData.data[1][1]).toBe(-1.5705005);
        expect(table.tableData.data[4][2]).toBe(5);
    });
});