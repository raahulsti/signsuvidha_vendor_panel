import { useState } from 'react';
import { Tabs, Table, InputNumber, Button, message, Space, Select } from 'antd';
import {
  useGetMaterialPricingQuery,
  useGetBasePricingQuery,
  useGetThicknessPricingQuery,
  useGetElementPricingQuery,
  useGetFontPricingQuery,
  useGetIlluminationPricingQuery,
  useUpsertMaterialPriceMutation,
  useUpsertBasePriceMutation,
  useUpsertThicknessPriceMutation,
  useUpsertElementPriceMutation,
  useUpsertFontPriceMutation,
  useUpsertIlluminationPriceMutation,
} from '../api/vendorApi';

function EditablePrice({ initial, onSave }) {
  const [val, setVal] = useState(initial ?? 0);
  return (
    <Space.Compact>
      <InputNumber min={0} step={0.01} value={val} onChange={setVal} style={{ width: 120 }} />
      <Button size="small" type="primary" onClick={() => onSave(val)}>Save</Button>
    </Space.Compact>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('materials');
  const [fontProductTypeFilter, setFontProductTypeFilter] = useState();
  const [illumProductTypeFilter, setIllumProductTypeFilter] = useState();
  const { data: materials = [], isLoading: loadingM } = useGetMaterialPricingQuery(undefined, { skip: activeTab !== 'materials' });
  const { data: basesData = [], isLoading: loadingB } = useGetBasePricingQuery(undefined, { skip: activeTab !== 'bases' });
  const { data: thicknessesData = [], isLoading: loadingT } = useGetThicknessPricingQuery(undefined, { skip: activeTab !== 'thicknesses' });
  const { data: elements = [], isLoading: loadingE } = useGetElementPricingQuery(undefined, { skip: activeTab !== 'elements' });
  const { data: fonts = [], isLoading: loadingF } = useGetFontPricingQuery(
    fontProductTypeFilter ? { product_type_id: fontProductTypeFilter } : undefined,
    { skip: activeTab !== 'fonts' }
  );
  const { data: illum = [], isLoading: loadingI } = useGetIlluminationPricingQuery(
    illumProductTypeFilter ? { product_type_id: illumProductTypeFilter } : undefined,
    { skip: activeTab !== 'illumination' }
  );
  const [upsertMaterial] = useUpsertMaterialPriceMutation();
  const [upsertBase] = useUpsertBasePriceMutation();
  const [upsertThickness] = useUpsertThicknessPriceMutation();
  const [upsertElement] = useUpsertElementPriceMutation();
  const [upsertFont] = useUpsertFontPriceMutation();
  const [upsertIllum] = useUpsertIlluminationPriceMutation();

  const matList = Array.isArray(materials) ? materials : materials?.data ?? [];
  const baseList = Array.isArray(basesData) ? basesData : basesData?.data ?? [];
  const thicknessList = Array.isArray(thicknessesData) ? thicknessesData : thicknessesData?.data ?? [];
  const elList = Array.isArray(elements) ? elements : elements?.data ?? [];
  const fontList = Array.isArray(fonts) ? fonts : fonts?.data ?? [];
  const illumList = Array.isArray(illum) ? illum : illum?.data ?? [];

  const saveMaterial = (materialId, price) => upsertMaterial({ materialId, price_per_sqft: price }).then(() => message.success('Saved')).catch(() => message.error('Failed'));
  const saveBase = (baseId, price) =>
    upsertBase({ baseId, price_per_sqft: price }).then(() => message.success('Saved')).catch(() => message.error('Failed'));
  const saveThickness = (thicknessId, price) =>
    upsertThickness({ thicknessId, price_per_sqft: price }).then(() => message.success('Saved')).catch(() => message.error('Failed'));
  const saveElement = (elementId, price) => upsertElement({ elementId, price_extra: price }).then(() => message.success('Saved')).catch(() => message.error('Failed'));
  const saveFont = (fontId, productTypeId, price) =>
    upsertFont({ fontId, product_type_id: productTypeId, price_extra: price })
      .then(() => message.success('Saved'))
      .catch(() => message.error('Failed'));

  const fontProductTypeOptions = Array.from(
    new Map(fontList.map((row) => [row.product_type_id, row.product_type_name])).entries()
  ).map(([value, label]) => ({ value, label }));

  const illumProductTypeOptions = Array.from(
    new Map(illumList.map((row) => [row.product_type_id, row.product_type_name])).entries()
  ).map(([value, label]) => ({ value, label }));

  const saveIllum = (illuminationOptionId, price) =>
    upsertIllum({ illuminationOptionId, price_per_sqft: price })
      .then(() => message.success('Saved'))
      .catch(() => message.error('Failed'));

  return (
    <>
      <h2 style={{ marginBottom: 16 }}>Pricing</h2>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Materials" key="materials">
          <Table dataSource={matList} columns={[
            { title: 'Material', dataIndex: 'material_name', key: 'name' },
            { title: 'Product Type', dataIndex: 'product_type_name', key: 'pt' },
            { title: 'Your rate (₹/sq ft)', key: 'price', render: (_, row) => <EditablePrice initial={row.price_per_sqft} onSave={(v) => saveMaterial(row.material_id, v)} /> },
          ]} rowKey="material_id" loading={loadingM} size="small" />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Bases" key="bases">
          <Table dataSource={baseList} columns={[
            { title: 'Base', dataIndex: 'base_name', key: 'name' },
            { title: 'Product Type', dataIndex: 'product_type_name', key: 'pt' },
            { title: 'Your rate (₹/sq ft)', key: 'price', render: (_, row) => <EditablePrice initial={row.price_per_sqft} onSave={(v) => saveBase(row.base_id, v)} /> },
          ]} rowKey="base_id" loading={loadingB} size="small" />
        </Tabs.TabPane> */}
        {/* <Tabs.TabPane tab="Thicknesses" key="thicknesses">
          <Table dataSource={thicknessList} columns={[
            { title: 'Thickness', dataIndex: 'thickness_name', key: 'name' },
            { title: 'Product Type', dataIndex: 'product_type_name', key: 'pt' },
            { title: 'Your rate (₹/sq ft)', key: 'price', render: (_, row) => <EditablePrice initial={row.price_per_sqft} onSave={(v) => saveThickness(row.thickness_id, v)} /> },
          ]} rowKey="thickness_id" loading={loadingT} size="small" />
        </Tabs.TabPane> */}
        <Tabs.TabPane tab="Elements" key="elements">
          <Table dataSource={elList} columns={[
            { title: 'Element', dataIndex: 'element_name', key: 'name' },
            { title: 'Your extra (₹)', key: 'price', render: (_, row) => <EditablePrice initial={row.price_extra} onSave={(v) => saveElement(row.element_id, v)} /> },
          ]} rowKey="element_id" loading={loadingE} size="small" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lit / Non-Lit" key="illumination">
          <div style={{ marginBottom: 12 }}>
            <Select
              allowClear
              placeholder="Filter by product type"
              style={{ minWidth: 240 }}
              value={illumProductTypeFilter}
              onChange={setIllumProductTypeFilter}
              options={illumProductTypeOptions}
            />
          </div>
          <Table dataSource={illumList} columns={[
            { title: 'Option', dataIndex: 'option_name', key: 'name' },
            { title: 'Category', dataIndex: 'category', key: 'cat', render: (c) => (c === 'lit' ? 'Lit' : 'Non-Lit') },
            { title: 'Product Type', dataIndex: 'product_type_name', key: 'pt' },
            { title: 'Your rate (₹/sq ft)', key: 'price', render: (_, row) => <EditablePrice initial={row.price_per_sqft} onSave={(v) => saveIllum(row.illumination_option_id, v)} /> },
          ]} rowKey="illumination_option_id" loading={loadingI} size="small" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Fonts" key="fonts">
          <div style={{ marginBottom: 12 }}>
            <Select
              allowClear
              placeholder="Filter by product type"
              style={{ minWidth: 240 }}
              value={fontProductTypeFilter}
              onChange={setFontProductTypeFilter}
              options={fontProductTypeOptions}
            />
          </div>
          <Table dataSource={fontList} columns={[
            { title: 'Font', dataIndex: 'font_name', key: 'font_name', render: (v) => <span style={{ fontFamily: `'${v}', sans-serif`, fontSize: 18 }}>{v}</span> },
            { title: 'Product Type', dataIndex: 'product_type_name', key: 'pt' },
            { title: 'Your extra (₹)', key: 'price', render: (_, row) => <EditablePrice initial={row.price_extra} onSave={(v) => saveFont(row.font_id, row.product_type_id, v)} /> },
          ]} rowKey={(row) => `${row.font_id}-${row.product_type_id}`} loading={loadingF} size="small" />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
