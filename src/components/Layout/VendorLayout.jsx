import { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { DashboardOutlined, UserOutlined, DollarOutlined, ShoppingOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../api/authApi';
import { logout } from '../../features/auth/authSlice';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
  { key: '/profile', icon: <UserOutlined />, label: <Link to="/profile">Profile</Link> },
  { key: '/pricing', icon: <DollarOutlined />, label: <Link to="/pricing">Pricing</Link> },
  // { key: '/orders', icon: <ShoppingOutlined />, label: <Link to="/orders">Orders</Link> },
];

export default function VendorLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try { await logoutApi(); } finally { dispatch(logout()); navigate('/login'); }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: collapsed ? 16 : 18, fontWeight: 600 }}>
          {collapsed ? 'SU' : 'SignsUvidha Vendor'}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 18, cursor: 'pointer' }} onClick={() => setCollapsed(false)} /> : <MenuFoldOutlined style={{ fontSize: 18, cursor: 'pointer' }} onClick={() => setCollapsed(true)} />}
          <Dropdown menu={{ items: [{ key: 'logout', icon: <LogoutOutlined />, label: 'Logout', onClick: handleLogout }] }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{user?.name || 'Vendor'}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24, minHeight: 280, background: '#fff', padding: 24, borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
