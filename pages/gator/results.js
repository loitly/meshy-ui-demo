import React from 'react';
import {useRouter} from 'next/router'

import {Gator} from './index';
import {hashcode} from '../../ext/util/utils';
import {Chart, Coverage, Table, tableFetch} from '../../ext/widgets/firefly';
import Link from 'next/link';

export default function Main() {

    const router = useRouter()
    const {pos, radius, catalog, mission='irsa', project} = router.query;

    if (!pos || !radius || !catalog || !project) return;

    const tblSrc = `https://irsa.ipac.caltech.edu/cgi-bin/Gator/nph-query?objstr=${pos}&radius=${radius}&catalog=${catalog}&mission=${mission}&outfmt=1`;
    const tbl_id = 'gator-' + hashcode(tblSrc);
    const formUrl = `/gator?pos=${pos}&radius=${radius}&catalog=${catalog}&mission=${mission}&project=${project}'`;

    return (
        <Gator>
            <Link href={formUrl}>back</Link>
            <Results tbl_id={tbl_id} tblSrc={tblSrc} />
        </Gator>
    );
}



export const Results = ({tbl_id, tblSrc}) => {
    return (
        <div className='box'>
            <div className='top'>
                <Coverage style={{marginRight: 5}}> coverage here </Coverage>
                <Chart tbl_id={tbl_id}> chart here </Chart>
            </div>
            <div className='bottom'>
                <Table style={{height: 'unset', flexGrow: .5}}
                         tbl_id={tbl_id} src={tblSrc} title='Search Results'
                         onHighlight={(a) => console.log(a)}
                         onSelect={(a) => console.log(a)}
                         onSort={(a) => console.log(a)}
                         onFilter={(a) => console.log(a)}
                />
            </div>

            <style jsx> {`
                .box {
                    display: flex;
                    flex-grow: 1;
                    flex-direction: column;
                }
                .top {
                    flex-grow: .5;
                    display: inline-flex;
                    margin-bottom: 5px;                
                }
                .bottom {
                    flex-grow: .5;
                    display: inline-flex;
                }
            `} </style>

        </div>
    );
}