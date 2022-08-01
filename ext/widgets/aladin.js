
import React, {useEffect, useState} from 'react';
import {uniqueId} from 'lodash';


let initialized = false;
let notifyMe = [];

async function loadAladin(scriptName) {
    if (initialized) return Promise.resolve();

    scriptName = scriptName || 'https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js';
    return new Promise(
        function(resolve, reject) {

            const head= document.getElementsByTagName('head')[0];
            const css= document.createElement('link');
            css.rel= 'stylesheet';
            css.href= 'https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css';

            const jquery= document.createElement('script');
            jquery.type= 'text/javascript';
            jquery.src= 'https://code.jquery.com/jquery-1.12.1.min.js';

            const aladin= document.createElement('script');
            aladin.type= 'text/javascript';
            aladin.src= scriptName;
            aladin.onload = () => {
                initialized = true;
                notifyMe?.forEach((resolve) => resolve());
                notifyMe = [];
            };

            head.appendChild(css);
            head.appendChild(jquery);
            head.appendChild(aladin);

            aladin.onerror= (ev) => reject(ev);
            notifyMe.push(resolve);
        });
}


export function Aladin({survey='P/DSS2/color', fov=60, target, id='aladin-ui', style={}}) {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (initialized) {
            A.aladin('#' + id, {survey, fov, target});
        } else loadAladin().then(() => {
            return setIsLoaded(true);
        });
    },[isLoaded, id, survey, fov, target]);

    return (<div id={id} style={{width:400, height:400, ...style}}/>);
}
