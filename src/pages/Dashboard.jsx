import { Card, Row, Col, Statistic, Table, Spin } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useGetDashboardStatsQuery } from '../api/vendorApi';

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardStatsQuery();
  const stats = data ?? {};
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
      {/* <Card title="Recent Orders">
        <Table dataSource={recentOrders} columns={[
          { title: 'Order #', dataIndex: 'order_number', key: 'order_number' },
          { title: 'Amount', dataIndex: 'total_amount', key: 'total_amount', render: (v) => `₹${Number(v || 0).toFixed(2)}` },
          { title: 'Status', dataIndex: 'status', key: 'status' },
          { title: 'Date', dataIndex: 'created_at', key: 'created_at', render: (d) => d ? new Date(d).toLocaleDateString() : '-' },
        ]} rowKey="id" pagination={false} size="small" />
      </Card> */}
    </>
  );
}
