const data=[];
for(let i=0;i< 2000; i++){
    data.push({
        key:i,
        name:`Edward King ${i}`,
        age:i+1,
        address:`Lodon, Park Lane no. ${i}`,
        perfact:`Footbal Backerbll no. ${i}`
    });
}

const columns =[
    {
        title:'姓名',
        dataIndex:'name',
        width:150
    },
    {
        title:'年龄',
        dataIndex:'age',
        width:150
    },
    {
        title:'地址',
        dataIndex:'address',
        width:300
    },
    {
        title:'喜好',
        dataIndex:'perfact',
        width:300
    }
]

export default {
    'get /api/reports/columns':function(req,res,next){
        setTimeout(()=>{
            res.json({
                result:columns
            })
        },100);
    },
    'post /api/reports/query':function(req,res,next){
        const {pageNum,pageSize,name,type}= req.body;
        let startNum = (pageNum-1)*pageSize;
        let endNum = pageNum*pageSize;
        // console.log(startNum,endNum);
        var tmpData = data.filter(v=> v.name.indexOf(name)>-1);;
        let count = tmpData.length;
        var resultData = tmpData.slice(startNum,endNum);
        setTimeout(() => {
            res.json({
                count:count,
                result:resultData
            })
        }, 2000);
        
    }
}