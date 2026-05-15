import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile', 'Dashboard', 'Pricing', 'Orders'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/vendor/profile',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: '/vendor/profile', method: 'PUT', body }),
      invalidatesTags: ['Profile'],
    }),
    getDashboardStats: builder.query({
      query: () => '/vendor/dashboard/stats',
      providesTags: ['Dashboard'],
    }),
    getMaterialPricing: builder.query({
      query: () => '/vendor/pricing/materials',
      providesTags: ['Pricing'],
    }),
    getMaterialStylePricing: builder.query({
      query: () => '/vendor/pricing/material-styles',
      providesTags: ['Pricing'],
    }),
    getFramePricing: builder.query({
      query: () => '/vendor/pricing/frames',
      providesTags: ['Pricing'],
    }),
    getWallpaperPricing: builder.query({
      query: () => '/vendor/pricing/wallpapers',
      providesTags: ['Pricing'],
    }),
    getBasePricing: builder.query({
      query: () => '/vendor/pricing/bases',
      providesTags: ['Pricing'],
    }),
    getThicknessPricing: builder.query({
      query: () => '/vendor/pricing/thicknesses',
      providesTags: ['Pricing'],
    }),
    getElementPricing: builder.query({
      query: () => '/vendor/pricing/elements',
      providesTags: ['Pricing'],
    }),
    getFontPricing: builder.query({
      query: (params) => ({ url: '/vendor/pricing/fonts', params }),
      providesTags: ['Pricing'],
    }),
    upsertMaterialPrice: builder.mutation({
      query: ({ materialId, price_per_sqft }) => ({
        url: `/vendor/pricing/materials/${materialId}`,
        method: 'PUT',
        body: { price_per_sqft },
      }),
      invalidatesTags: ['Pricing'],
    }),
    upsertMaterialStylePrice: builder.mutation({
      query: ({ materialStyleId, price_per_sqft }) => ({
        url: `/vendor/pricing/material-styles/${materialStyleId}`,
        method: 'PUT',
        body: { price_per_sqft },
      }),
      invalidatesTags: ['Pricing'],
    }),
    upsertFramePrice: builder.mutation({
      query: ({ frameId, price_per_sqft }) => ({
        url: `/vendor/pricing/frames/${frameId}`,
        method: 'PUT',
        body: { price_per_sqft },
      }),
      invalidatesTags: ['Pricing'],
    }),
    upsertWallpaperPrice: builder.mutation({
      query: ({ wallpaperId, price_per_sqft }) => ({
        url: `/vendor/pricing/wallpapers/${wallpaperId}`,
        method: 'PUT',
        body: { price_per_sqft },
      }),
      invalidatesTags: ['Pricing'],
    }),
    upsertBasePrice: builder.mutation({
      query: ({ baseId, price_per_sqft }) => ({
        url: `/vendor/pricing/bases/${baseId}`,
        method: 'PUT',
        body: { price_per_sqft },
      }),
      invalidatesTags: ['Pricing'],
    }),
    upsertThicknessPrice: builder.mutation({
      query: ({ thicknessId, price_per_sqft }) => ({
        url: `/vendor/pricing/thicknesses/${thicknessId}`,
        method: 'PUT',
        body: { price_per_sqft },
      }),
      invalidatesTags: ['Pricing'],
    }),
    upsertElementPrice: builder.mutation({
      query: ({ elementId, price_extra }) => ({
        url: `/vendor/pricing/elements/${elementId}`,
        method: 'PUT',
        body: { price_extra },
      }),
      invalidatesTags: ['Pricing'],
    }),
    upsertFontPrice: builder.mutation({
      query: ({ fontId, product_type_id, price_extra }) => ({
        url: `/vendor/pricing/fonts/${fontId}`,
        method: 'PUT',
        body: { product_type_id, price_extra },
      }),
      invalidatesTags: ['Pricing'],
    }),
    getIlluminationPricing: builder.query({
      query: (params) => ({ url: '/vendor/pricing/illumination', params }),
      providesTags: ['Pricing'],
    }),
    upsertIlluminationPrice: builder.mutation({
      query: ({ illuminationOptionId, price_per_sqft }) => ({
        url: `/vendor/pricing/illumination/${illuminationOptionId}`,
        method: 'PUT',
        body: { price_per_sqft },
      }),
      invalidatesTags: ['Pricing'],
    }),
    getOrders: builder.query({
      query: (params) => ({ url: '/vendor/orders', params }),
      providesTags: ['Orders'],
    }),
    getOrder: builder.query({
      query: (id) => `/vendor/orders/${id}`,
      providesTags: (_, __, id) => [{ type: 'Orders', id }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/vendor/orders/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Orders', 'Dashboard'],
    }),
    emailOrderInvoice: builder.mutation({
      query: ({ id, email }) => ({ url: `/vendor/orders/${id}/invoice/email`, method: 'POST', body: { email } }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetDashboardStatsQuery,
  useGetMaterialPricingQuery,
  useGetMaterialStylePricingQuery,
  useGetFramePricingQuery,
  useGetWallpaperPricingQuery,
  useGetBasePricingQuery,
  useGetThicknessPricingQuery,
  useGetElementPricingQuery,
  useGetFontPricingQuery,
  useUpsertMaterialPriceMutation,
  useUpsertMaterialStylePriceMutation,
  useUpsertFramePriceMutation,
  useUpsertWallpaperPriceMutation,
  useUpsertBasePriceMutation,
  useUpsertThicknessPriceMutation,
  useUpsertElementPriceMutation,
  useUpsertFontPriceMutation,
  useGetIlluminationPricingQuery,
  useUpsertIlluminationPriceMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useEmailOrderInvoiceMutation,
} = vendorApi;
