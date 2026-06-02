import { Card, Row, Col, Statistic, Table, Tag, Spin } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useGetDashboardStatsQuery } from '../api/vendorApi';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetDashboardStatsQuery(undefined, { refetchOnMountOrArgChange: true });
  const stats = data?.data ?? data ?? {};
  const recentOrders = stats.recent_orders ?? [];

  if (isLoading) return <Spin size="large" />;

  return (
    <>
      <h2 style={{ marginBottom: 24 }}>Dashboard</h2>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}><Card><Statistic title="Total Orders" value={stats.total_orders ?? 0} prefix={<ShoppingCartOutlined />} /></Card></Col>
        <Col xs={24} sm={8}><Card><Statistic title="Revenue (₹)" value={Number(stats.total_revenue ?? 0).toLocaleString()} prefix={<DollarOutlined />} /></Card></Col>
        <Col xs={24} sm={8}><Card><Statistic title="Pending" value={stats.pending_orders ?? 0} prefix={<ClockCircleOutlined />} /></Card></Col>
      </Row>
      {/* <Card title="Recent Orders" extra={<Link to="/orders">View all</Link>}>
        <Table dataSource={recentOrders} columns={[
          { title: 'Order #', dataIndex: 'order_number', key: 'order_number', ellipsis: true, render: (v) => v || '-' },
          { title: 'Customer', dataIndex: 'customer_name', key: 'customer_name', render: (v) => v || '-' },
          { title: 'Amount', dataIndex: 'total_amount', key: 'total_amount', align: 'right', render: (v) => `₹${Number(v || 0).toFixed(2)}` },
          { title: 'Status', dataIndex: 'status', key: 'status', align: 'center', render: (s) => <Tag>{s}</Tag> },
          { title: 'Date', dataIndex: 'created_at', key: 'created_at', render: (d) => d ? new Date(d).toLocaleDateString() : '-' },
          {
            title: 'Action',
            key: 'actions',
            width: 80,
            align: 'center',
            render: (_, row) => <a onClick={(e) => { e.stopPropagation(); navigate(`/orders/${row.id}`); }}>View</a>,
          },
        ]} rowKey="id" pagination={false} size="small"
          onRow={(row) => ({ onClick: () => navigate(`/orders/${row.id}`), style: { cursor: 'pointer' } })}
        />
      </Card> */}
    </>
  );
}
