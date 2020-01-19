import React,{ Component } from 'react';
import {Layout,Menu,Icon,ConfigProvider,Row,Col,Statistic } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import indexStyle from './index.less';
moment.locale('zh-cn');

const {Header,Footer,Sider,Content } =Layout;
const SubMenu = Menu.SubMenu;
const { Countdown } = Statistic;

class BasicLayout extends Component{
    constructor(props){
        super(props);
        this.state={
            timeNow:Date.now()
        }
    }
    componentDidMount(){
        this.timeHandle = setInterval(()=>{
            this.setState({timeNow:Date.now()})
        },1000);
    }
    componentWillUnmount(){
        window.clearInterval(this.timeHandle);
    }

    timestampToTime(timestamp){
        var date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }

    render(){
        const {timeNow} = this.state;
        return (
            <div style={{overflow:'hidden'}}>
                <Layout>
                    <div className={ indexStyle.Header }>
                        <Row>
                            <Col span={12} className={indexStyle.HeaderTitle}>
                                <span><Icon type="compass" />蚂蚁金服</span>
                            </Col>
                            
                            <Col span={12} >
                                <div style={{ paddingRight:5, width:'100%', float:'right',textAlign:'right'}}>
                                    <span style={{ marginRight:10}}>
                                        <Icon type="user" />张三
                                    </span>
                                    <span style={{ marginRight:10,marginLeft:10}}>
                                            <Icon type="clock-circle"/>
                                            { this.timestampToTime(timeNow) }
                                    </span>
                                </div>
                            </Col>
                            
                        </Row>
                    </div>
                    <Content style={{ margin:'2px 2px 0'}}>
                        <div style={{padding: 2, background:'#fff',height:'100%'}}>
                            <ConfigProvider locale={zh_CN}>
                                { this.props.children}
                            </ConfigProvider>
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default BasicLayout;