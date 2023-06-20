import React, { Children, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ShoppingCartOutlined

} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import "../styles/defaultLayout.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cartpage from '../pages/Cartpage';
const { Header, Sider, Content } = Layout;
import logo from '../assets/logo.svg'

const DefaultLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const cart = useSelector((state)=>state.cart.cartItems);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
           <p className='text-center text-light fw-bold mt-4 fs-5'>{collapsed?<img height="60px" width="60px"src={logo}/>: "The Green Grocers"}</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
            <Menu.Item key="/" icon={<HomeOutlined/>}>
                <Link to="/" className='no-underline' >Homepage</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
                <Link to="/items" className='no-underline' >Items</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined/>}>
                <Link to="/bills" className='no-underline' >Bills</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<HomeOutlined/>}>
                <Link to="/customers" className='no-underline' >Customers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined/>}>
                Logout
            </Menu.Item>

        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button 
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="cart_icon">
          
           <Link to="/cart" className='no-underline'> <ShoppingCartOutlined style={{position:'relative',left:-20,bottom:-3}} /></Link>
          { cart.length>0&&
          
            <div style={{position:'absolute',top:-10,fontSize:12,color:'#000', backgroundColor:'#000',height:'10px',width:'10px'}}>{cart.length}</div>
          }

          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;