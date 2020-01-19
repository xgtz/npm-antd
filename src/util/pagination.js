export default {
    current:1,
    pageSize:100,
    pageSizeOptions:['50','100','150','200'],
    showSizeChanger:true,
    showQuickJumper:true,
    simple:false,
    total:0,
    showTotal: total => `共${total}条`,
    onChange:()=>{},
    onShowSizeChange:()=>{}
}