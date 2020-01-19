import React,{ Component } from 'react';
import {message,Spin,Icon, Form,Row,Col} from 'antd';
import BasicTable from '../component/BasicTable';
import Pagination from '../../util/pagination';
import reportStle from './index.less'
import {connect } from 'dva';

const namespace='report';


const mapStateToProps= (state) =>{
    return {
        reportLoading: state.loading.effects['report/queryReportData'],
        reportColumns:state[namespace].reportColumns,
        reportDataSource:state[namespace].reportData,
        reportDataCount:state[namespace].reportDataCount
    }
}


class Report extends Component{
    constructor(props){
        super(props);
        this.state={
            deskDivWidth: document.body.clientWidth,
            deskDivHeight:document.body.clientHeight,
            selectedKey:'',
            selectedRowKeys:[],
            selectedRows:[],
            params:{
                pageNum:1,
                pageSize:100,
                name:'',
                type:''
            }
        }
    }
    componentDidMount(){
        window.addEventListener('resize', this.handleSize);
        this.loadReportColumns();
        this.loadReportList();
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.handleSize);
    }
    handleSize=()=>{
        this.setState({
            deskDivHeight:document.body.clientHeight
        })
    }
    handleColumns=(columns)=>{
        var vColumns = columns;
        vColumns.forEach( v=>{
            v.sorter = (a, b) => a > b;
            v.sortDirections=['descend','ascebd'];
        })
        return vColumns;
    }
    loadReportColumns=()=>{
        this.props.dispatch({
            type:`${namespace}/queryReportColumns`
        })
    }
    loadReportList=()=>{
        this.props.dispatch({
            type:`${namespace}/queryReportData`,
            payload:{
                ...this.state.params
            }
        })
    }
    render(){
        const {deskDivHeight,deskDivWidth,selectedKey,selectedRowKeys} = this.state;
        const { reportLoading,reportColumns,reportDataSource,reportDataCount} = this.props;
        
        let columns = this.handleColumns(reportColumns);
        let xWidth = deskDivWidth*0.5-2;
        let yheight = deskDivHeight - 160;
        const  pagination = {
            ...Pagination,
            total: reportDataCount,
            onChange:(page,pageSize)=>{ 
                this.state.params.pageSize = pageSize;
                this.state.params.pageNum = page;
                this.loadReportList();
            },
            onShowSizeChange:(current,size)=>{
                this.state.params.pageSize=size;
                this.state.params.pageNum=1;
                this.loadReportList();
            }
        }

        return (
            <div style={{marginBottom:2}}>
                <div style={{ marginBottom:0, height:35}}>
                    <Row>
                        <Col>tools</Col>
                    </Row>
                </div>
                <div id="divReport" >
                    <Row>
                        <Col span={12}>
                            <Spin size="large" spinning={reportLoading} tip="加载中...">
                                <BasicTable 
                                    rowSelection="checkbox"
                                    pagination={pagination}
                                    xscroll={xWidth}
                                    yscroll={yheight }
                                    that={this}
                                    selectedKey={selectedKey}
                                    selectedRowKeys={selectedRowKeys}
                                    columns={columns}
                                    dataSource={reportDataSource}
                                />
                            </Spin>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Form.create()(Report));