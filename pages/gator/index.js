import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import {tableFetch} from '../../ext/widgets/firefly'
import {Page} from '../index';
import {useRouter} from 'next/router';
import {Form, formContext, Input, Select} from '../../ext/widgets/form';
import {uniq} from 'lodash';

export default function Main() {

    const router = useRouter();
    const params = router?.query || {};

    const onSubmit = (data) => {
        const pos = encodeURIComponent(data.pos);
        const {radius, catalog, mission='irsa', project} = data;
        router.push({
            pathname: '/gator/results',
            query: {pos, radius, catalog, mission, project},
        })
    };

    const [{catMaster, projects, catalogs}, setCatMaster] = useState({});

    useEffect(() => {
        tableFetch({id: 'irsaCatalogMasterTable'}).then((catMaster) => {
            const projects = uniq(catMaster.tableData?.data?.map(r => r[0])).map(value => ({value}));
            const catalogs = params.project && catMaster?.tableData?.data?.filter((r) => r[0] === params.project)?.map(r => ({value:r[4]}));
            setCatMaster({catMaster, projects, catalogs});
        });
    }, [params.project]);


    return (
        <Gator>
            <Form style={{margin: '10px 0'}} onSubmit={onSubmit} options={{mode:'onBlur', shouldUnregister: true}}>
                <PositionSearch {...{onSubmit, catMaster, projects, catalogs}} {...params}/>
            </Form>
        </Gator>
    );
}

export const Gator = ({children}) => {

    return (
        <Page>
            <Head>
                <title>IRSA Catalog</title>
                <link rel='icon' href='/gator/favicon.ico' />
            </Head>
            <h1 style={{textAlign: 'center'}}>IRSA Catalog</h1>

            {children}
        </Page>
    );
}

const PositionSearch = ({catMaster, pos, radius, catalog, project, projects, onSubmit} ) => {


    const {watch} = formContext();
    let cproject = watch('project', project);
    cproject = cproject || projects?.[0]?.value;
    const catalogs = catMaster?.tableData?.data?.filter((r) => r[0] === cproject)?.map(r => ({value:r[4]}));

    return (
        <div className='box'>
            <Input name='pos' label='Position:' required={true} defaultValue={pos}/>

            <div className='examples'>
                <div> Examples:</div>
                <div>
                    <a onClick={() => onSubmit({pos: 'MESSIER 081', radius: 10, catalog: 'allwise_p3as_psd', project: 'WISE'})}>MESSIER 081 </a>
                    <a onClick={() => onSubmit({pos: '142.09185 +40.90014 ga', radius: 10, catalog: 'allwise_p3as_psd', project: 'WISE'})}> 142.09185 +40.90014 ga </a>
                    <a onClick={() => onSubmit({pos: '09h55m33.17s +69d03m55.0s', radius: 10, catalog: 'allwise_p3as_psd', project: 'WISE'})}> 09h55m33.17s +69d03m55.0s </a>
                    <a onClick={() => onSubmit({pos: '119.4903298 51.5802410 ecl', radius: 10, catalog: 'allwise_p3as_psd', project: 'WISE'})}> 119.4903298 51.5802410 ecl </a>
                </div>
            </div>

            <div className='cat'>
                <Input name='radius'  label='Radius:' title='Search radius in arcseconds' {...{min:1, max:1080, required:true, defaultValue:radius}}/>
                <Select name='project' label='Project:' options={projects} defaultValue={project}/>
                <Select name='catalog' label='Catalog:' options={catalogs} defaultValue={catalog}/>
            </div>

            <div><input style={{marginTop: 20}} type='submit'/></div>

            <style jsx> {`
                .box {
                    border: 1px solid #bfbfbf;
                    background-color: #e3e3e3;
                    border-radius: 6px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                div :global(.form-label) {
                    width: 75px;
                    font-weight: bold;
                }
                div :global(.form-input) {
                    width: 200px;
                }
                div.cat :global(.form-label) {
                    width: 50px;
                    margin: 15px 0 0px 30px;
                    display: inline-block;                    
                }
                div.cat :global(.form-input) {
                    margin-left: 30px;
                    width: 185px;                    
                }
                .examples {
                    margin: 0 0 20px;
                    font-style: italic;
                    color: gray;
                }
                .examples a {
                    text-decoration: none;   
                    font-size: small;
                    color: blue;             
                }
                .examples a:hover {
                    cursor: pointer; 
                    color: green;             
                }
                .examples a ::after {
                    content: ']   ';
                }
                .examples a ::before {
                    content: '   [';
                }
            `} </style>

        </div>
    );

};
