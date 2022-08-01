import fs from 'fs';
import readline from 'readline';


export async function parseFile({path}) {
    return parseStream({input: fs.createReadStream(path)});
}

export async function parseStream({input}) {
    const rl = readline.createInterface({input, crlfDelay: Infinity});

    const keywords  = [];           // {key,value}
    const columns   = [];           // TableColumn
    const data      = [];           // array of row data

    let   hlines    = 0;
    const colWidths = [];           // the data width of each column.  used for parsing
    for await (const line of rl) {
        if (!line) continue;
        if (line.startsWith('\\')) {
            let [key, value] = line.split('=');
            if (key) {
                key = key.substring(1);
                if (!line.includes('=')) {
                    value = key;
                    key = undefined;
                }
                keywords.push({key, value});
            }
        } else if (line.startsWith('|')) {
            hlines++;
            const vals = line.split('|');
            for(let idx = 1; idx < vals.length-1; idx++) {
                const v = vals[idx];
                if (hlines === 1) {
                    columns.push({name: v.trim()});
                    colWidths.push(v.length);
                } else if(hlines === 2) {
                    columns[idx-1].type = v.trim();
                } else if(hlines === 3) {
                    columns[idx-1].units = v.trim();
                } else if(hlines === 4) {
                    columns[idx-1].nullString = v.trim();
                }
            }
        } else if (colWidths.length > 0) {        // start of data
            const row =[];
            let   cidx = 1;
            colWidths.forEach((w, idx) => {
                const end = cidx+w;
                row.push(stringToData(columns[idx], line.substring(cidx, end).trim()));
                cidx = end+1;
            });
            data.push(row);
        }
    }
    const tableMeta = {};
    keywords.forEach(({key='', value=''}) => {
        const [,cname,cprop] = key.match(/^col\.(\w+)\.(\w+)/) || [];
        if (cname) {
            const col = columns.find(({name}) => name === cname);
            if (col) col[cprop] = value;
        } else {
            tableMeta[key] = value;
        }
    });
    return {keywords, tableMeta, tableData:{columns, data}, totalRows: data.length};
}

function stringToData(col, val) {
    if (['long', 'l', 'int', 'i'].includes(col.type.toLowerCase())) {
        return parseInt(val);
    } else if (['double', 'd', 'float', 'f'].includes(col.type.toLowerCase())) {
        return Number(val);
    }


}
