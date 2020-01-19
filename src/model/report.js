import * as service from '../service/report';

export default {
    namespace:'report',
    state:{
        reportDataCount:0,
        reportColumns:[],
        reportData:[]
    },
    effects:{
        *queryReportColumns({payload},{call,put}){
            const rsp = yield call(service.queryReportColumns,payload);
            yield put({type:'updateReportColumns',payload:{reportColumns: rsp.result }});
        },
        *queryReportData({payload},{call,put}){
            const rsp = yield call(service.queryReportData,payload);
            yield put({type:'updateReportData',payload:{reportData:rsp.result,reportDataCount:rsp.count}})
        }
    },
    reducers:{
        updateReportColumns(state,{payload:{reportColumns}}){
            return {
                ...state,
                reportColumns
            }
        },
        updateReportData(state,{payload:{reportData,reportDataCount}}){
            return {
                ...state,
                reportData,
                reportDataCount
            }
        },
        
    }
}