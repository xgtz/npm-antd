import React,{ Component } from 'react';
import {Table} from 'antd';
import basicTableStyle from './BasicTable.less';


class BasicTable extends Component{

    onRowClick(item,index){
        let { selectedRowKeys }= this.props;
        let { selectedRows }= this.props.that.state;
        let selectedKey = item.key;
        if('checkbox'===this.props.rowSelection){
            const index_ = selectedRowKeys.indexOf(selectedKey);
            if(index_<0){
                selectedRowKeys.push(selectedKey);
                selectedRows.push(item);
                this.props.that.setState({selectedRowKeys,selectedRows,selectedKey});
            } else{
                selectedRowKeys.splice(index_,1);
                selectedRows.splice(index_,1);
                this.props.that.setState({selectedRowKeys,selectedRows});
            }
        } else{
            this.props.that.setState({selectedRowKeys:selectedKey,selectedRows:item,selectedKey});
        }
    }

    updateSelectedItem(selectedRowKeys,selectedRows){
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    tableInit(){
        let rowSelection={
            type:this.props.rowSelection==="checkbox"?"checkbox":"radio",
            selectedRowKeys: this.props.selectedRowKeys,
            onChange:this.updateSelectedItem.bind(this.props.that)
        }

        return (
            <Table 
                loading={this.props.loading}
                columns={this.props.columns}
                dataSource={this.props.dataSource}
                size="small"
                bordered
                scroll={{ x: this.props.xscroll,y: this.props.yscroll }}
                pagination={ this.props.pagination}
                rowSelection={this.props.rowSelection === false?null:rowSelection}
                onRow={(record,index) =>{
                    return {
                        onClick: ()=>{
                            this.onRowClick(record,index);
                        }
                    }
                }}
                rowClassName={(record,index) => {
                    let className = index % 2 ? 'shallow_gray': 'deep_gray';
                    return record.key === this.props.that.state.selectedKey? className+' clickRowStyl':className;
                }}
            />
        )
    }

    render(){
        return (
            <div>
                { this.tableInit()}
            </div>
        )
    }
}

export default BasicTable;