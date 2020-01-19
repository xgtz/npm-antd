import request from '../util/request';

export function queryReportColumns(){
    return request('/api/reports/columns');
}

export function queryReportData(data){
    return request('/api/reports/query',{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify(data)
    });
}