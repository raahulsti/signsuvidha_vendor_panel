import { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Spin, Image } from 'antd';
import { useGetProfileQuery, useUpdateProfileMutation } from '../api/vendorApi';

export default function Profile() {
  const { data, isLoading } = useGetProfileQuery();
  const [update, { isLoading: updating }] = useUpdateProfileMutation();
  const [form] = Form.useForm();
  const [logoFile, setLogoFile] = useState(null);
  const profile = data?.data ?? data ?? {};

  useEffect(() => {
    if (profile && Object.keys(profile).length) {
      form.setFieldsValue({
        business_name: profile.business_name || '',
        gst_number: profile.gst_number || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
      });
    }
  }, [profile, form]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => { if (v != null) formData.append(k, String(v)); });
      if (logoFile instanceof File) formData.append('logo', logoFile);
      await update(formData).unwrap();
      message.success('Profile updated');
      setLogoFile(null);
    } catch (err) { message.error(err?.data?.message || 'Failed'); }
  };

  if (isLoading) return <Spin size="large" />;

  return (
    <>
      <h2 style={{ marginBottom: 16 }}>Profile</h2>
      <Card>
        {profile.logo_url ? (
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Current Logo</div>
            <Image src={profile.logo_url} alt="Vendor logo" width={120} height={120} style={{ objectFit: 'cover', borderRadius: 8 }} />
          </div>
        ) : null}
        <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
          <Form.Item name="business_name" label="Business Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="gst_number" label="GST Number"><Input /></Form.Item>
          <Form.Item name="address" label="Address"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="city" label="City"><Input /></Form.Item>
          <Form.Item name="state" label="State"><Input /></Form.Item>
          <Form.Item name="pincode" label="Pincode"><Input /></Form.Item>
          <Form.Item label="Logo">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setLogoFile(file);
              }}
            />
          </Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" loading={updating}>Update Profile</Button></Form.Item>
        </Form>
      </Card>
    </>
  );
}
