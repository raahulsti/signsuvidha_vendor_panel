import { useState } from 'react';
import { Table, Tag, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../api/vendorApi';

export default function Orders() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const { data, isLoading } = useGetOrdersQuery(filters);
  const list = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Orders</h2>
        <Select placeholder="Status" allowClear style={{ width: 140 }} onChange={(v) => setFilters((f) => ({ ...f, status: v }))}>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="confirmed">Confirmed</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
        </Select>
      </div>
      <Table dataSource={list} columns={[
        { title: 'Order #', dataIndex: 'order_number', key: 'order_number', width: 140 },
        { title: 'Amount', dataIndex: 'total_amount', key: 'total_amount', render: (v) => `₹${Number(v || 0).toFixed(2)}` },
        { title: 'Seller Type', dataIndex: 'seller_type', key: 'seller_type', render: (v) => <Tag color={v === 'admin' ? 'blue' : 'purple'}>{v || '-'}</Tag> },
        { title: 'Seller ID', dataIndex: 'seller_id', key: 'seller_id', render: (v) => v ?? '-' },
        { title: 'GST Amount', dataIndex: 'gst_amount', key: 'gst_amount', render: (v) => `₹${Number(v || 0).toFixed(2)}` },
        { title: 'Payable', dataIndex: 'payable_amount', key: 'payable_amount', render: (v, row) => `₹${Number(v ?? row.total_amount ?? 0).toFixed(2)}` },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag>{s}</Tag> },
        { title: 'Date', dataIndex: 'created_at', key: 'created_at', render: (d) => d ? new Date(d).toLocaleString() : '-' },
        { title: '', key: 'actions', width: 80, render: (_, row) => <a onClick={() => navigate(`/orders/${row.id}`)}>View</a> },
      ]} rowKey="id" loading={isLoading} pagination={pagination ? { total: pagination.total, pageSize: pagination.limit, current: pagination.page } : false} />
    </>
  );
}
