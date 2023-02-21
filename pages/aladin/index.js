import React, {useState, useEffect} from 'react';
import Head from 'next/head'

import {Aladin} from '../../ext/widgets/aladin';

import {Form, Input, Select} from '../../ext/widgets/form';
import {Page} from '../index';

export default function Main() {
    const title = 'Aladin Viewer';
    const [params={}, setParams] = useState();

    const onSubmit = (data) => {
        setParams(data);
    };

    return (
        <Page>
            <Head>
                <title>{title}</title>
            </Head>

            <div className='container'>
                <h2 style={{textAlign: 'center'}}>{title}</h2>
                    <Form className='form' onSubmit={onSubmit} options={{mode:'onBlur', shouldUnregister: false}}>
                        <Position onSubmit={onSubmit}/>
                    </Form>
                <Results {...params}/>
            </div>

            <style jsx> {`
                .container {
                    position: absolute;
                    top: 120px;
                    bottom: 20px;
                    left: 20px;
                    right: 20px;
                }               
            `} </style>
        </Page>
    );
}

function Position({onSubmit}) {

    const survey = [
        {value:"P/Fermi/color", text:'Fermi color'},
        {value:"P/GALEXGR6/AIS/color", text:'GALEX Allsky Imaging Survey (AIS) colored'},
        {value:"P/DSS2/color", text:'DSS colored'},
        {value:"P/DSS2/red", text:'DSS2 Red (F+R)'},
        {value:"P/DSS2/blue", text:'DSS2 Blue (XJ+S)'},
        {value:"P/SDSS9/color", text:'SDSS9 color'},
        {value:"P/Mellinger/colo", text:'Mellinger color'}
];

    return (
        <div className='box'>
            <Input name='target' label='Initial location:' required={true}/>
            <Select name='survey' label='Image survey:' options={survey}/>
            <Input name='fov'  label='Initial FoV:' {...{defaultValue: 60, min:1, max:360, required:true}}/>

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
                    width: 125px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                div :global(.form-input) {
                    width: 200px;
                }
            `} </style>

        </div>
    );
}

function Results({target, fov, survey}) {
    if (!target) return null;
    return (
        <div className='box'>
            <div>
                <Aladin style={{width: 'unset', height: 'unset', flexGrow: 1}} {...{survey,target,fov}} />
            </div>

            <style jsx> {`
                .box {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .box > div {
                    flex-grow: .5;
                    display: inline-flex;
                }
            `} </style>
        </div>
    );

}