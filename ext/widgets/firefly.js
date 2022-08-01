
import React, {useEffect, useState} from 'react';
import {uniqueId} from 'lodash';

const DEF_FIREFLY = 'https://irsadev.ipac.caltech.edu/irsaviewer/'


let notifyMe = [];
export async function loadFirefly(scriptName) {
    if (window.fireflyIsLoaded) return Promise.resolve();

    if (!window.onFireflyLoaded) {
        window.onFireflyLoaded = () => {
            window.fireflyIsLoaded = true;
            notifyMe?.forEach((resolve) => resolve());
            notifyMe = [];
        }
    }
    scriptName = scriptName || DEF_FIREFLY + 'firefly_loader.js';
    return new Promise(
        function(resolve, reject) {
            const head= document.getElementsByTagName('head')[0];
            const script= document.createElement('script');
            script.type= 'text/javascript';
            script.src= scriptName;
            head.appendChild(script);
            // script.onload= (ev) => resolve(ev);
            script.onerror= (ev) => reject(ev);
            notifyMe.push(resolve);
        });
}



export function Table({style={}, className, src, altSrc, title, META_INFO={}, options={}, tbl_id='Table',
                        onHighlight, onSelect, onSort, onFilter, onLoaded, onRemove, onEvent}) {

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (isLoaded) {
            const treq = firefly.util.table.makeFileRequest(title, src, altSrc, {META_INFO, tbl_id});
            firefly.showTable(tbl_id, treq, options);

            const {TABLE_FILTER, TABLE_HIGHLIGHT, TABLE_LOADED, TABLE_REMOVE, TABLE_SELECT, TABLE_SORT} = window.firefly.action.type;
            if (onHighlight || onSelect || onSort || onFilter || onLoaded || onRemove || onEvent) {
                const callback = (action) => {
                    const {type} = action;
                    const ctbl_id = action.payload?.tbl_id || action.payload?.request?.tbl_id;
                    if (ctbl_id === tbl_id) {
                        onEvent && onEvent(action);
                        switch (type) {
                            case TABLE_FILTER:      onFilter    && onFilter(action);    break;
                            case TABLE_HIGHLIGHT:   onHighlight && onHighlight(action); break;
                            case TABLE_LOADED:      onLoaded    && onLoaded(action);    break;
                            case TABLE_REMOVE:      onRemove    && onRemove(action);    break;
                            case TABLE_SELECT:      onSelect    && onSelect(action);    break;
                            case TABLE_SORT:        onSort      && onSort(action);      break;
                        }
                    }
                }
                return firefly.util.addActionListener([TABLE_FILTER, TABLE_HIGHLIGHT, TABLE_LOADED, TABLE_REMOVE, TABLE_SELECT, TABLE_SORT], callback);
            }

        } else loadFirefly().then(() => {
            setIsLoaded(true);
        });
    },[isLoaded, tbl_id]);

    style = {width: '100%', height: '100%', ...style};
    return (<div className={className} style={style} id={tbl_id}/>);
}


export function Chart({style={}, className, tbl_id, tblRequest, chartId}) {

    chartId = chartId || 'Chart-' + tbl_id;
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (isLoaded) {
            if (!tbl_id && tblRequest) {
                const {title, src, altSrc, META_INFO} = tblRequest;
                const treq = firefly.util.table.makeFileRequest(title, src, altSrc, META_INFO);
                tbl_id = treq.tbl_id;
                firefly.action.dispatchTableFetch(treq);
            }
            firefly.showXYPlot(chartId, {tbl_id, chartType: 'auto'});
        } else loadFirefly().then(() => {
            return setIsLoaded(true);
        });
    },[isLoaded, tbl_id, chartId]);

    style = {width: '100%', height: '100%', ...style};
    return (<div className={className} style={style} id={chartId}/>);
}


export function Coverage({style={}, className, options={}, id='Coverage', children}) {

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (isLoaded) {
            firefly.showCoverage(id, {gridOn:'FALSE', ...options});
        } else loadFirefly().then(() => {
            return setIsLoaded(true);
        });
    },[isLoaded, id]);

    style = {width: '100%', height: '100%', ...style};
    return (
        <div className={className} style={style} id={id}>
            {children}
        </div>
    );
}


export function TableGroup({style={}, tbl_group=`group-${uniqueId()}`, children}) {

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (isLoaded) {
            React.Children.toArray(children).forEach( (table) => {
                const {title, src, altSrc, META_INFO, options={}, tbl_id} = table.props;
                const treq = firefly.util.table.makeFileRequest(title, src, altSrc, {META_INFO, tbl_id});
                options.tbl_group = tbl_group;
                firefly.showTable(tbl_group, treq, options);
            });
        } else loadFirefly().then(() => {
            return setIsLoaded(true);
        });
    },[isLoaded, tbl_group]);

    style = {width: '100%', height: '100%', ...style};
    return (
        <div style={style} id={tbl_group}>
                {children}
        </div>
    );
}


/**
 * Use firefly to fetch a table from the given request.
 * @param {TableRequest} request  of type https://fireflydev.ipac.caltech.edu/firefly/docs/js/global.html#TableRequest
 */
export async function tableFetch(request) {
    await loadFirefly();
    request = {pageSize:Number.MAX_SAFE_INTEGER, ...request};
    return await firefly.util.table.doFetchTable(request);
}
