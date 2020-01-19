import React,{ Component } from 'react';
import {Layout,Menu,Icon,ConfigProvider,Row,Col } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import indexStyle from './index.less';
moment.locale('zh-cn');

const {Header,Footer,Sider,Content } =Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends Component{
    render(){
        return (
            <div style={{overflow:'hidden'}}>
                <Layout>
                    <div className={ indexStyle.Header }>
                        <Row>
                            <Col span={12} className={indexStyle.HeaderTitle}>
                                <span><Icon type="compass" />蚂蚁金服</span>
                            </Col>
                            <Col span={7}></Col>
                            <Col span={2}><span><Icon type="user">张三</Icon> </span></Col>
                            <Col span={3}><span><Icon type="clock-circle"/>2020/01/19</span></Col>
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