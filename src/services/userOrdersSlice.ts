import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RemoteData, remoteData } from '../utils/remote-data';

export interface UserOrdersState {
  orders: RemoteData<TOrder[]>;
}

const initialState: UserOrdersState = {
  orders: remoteData.notAsked()
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectIsPending: (state) => remoteData.isWaiting(state.orders),
    selectError: (state) =>
      remoteData.getRejectedWithDefault(state.orders, null),
    selectOrders: (state) => remoteData.getWithDefault(state.orders, null)
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.orders = remoteData.waiting();
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.orders = remoteData.rejected(
          action.error.message ||
            'Не удалось получить заказы пользователся. Повторите попытку позже'
        );
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = remoteData.fulfilled(action.payload);
      })
});

export const getUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  getOrdersApi
);

export const userOrdersDepot = {
  reducer: userOrdersSlice.reducer,
  ...userOrdersSlice.actions,
  ...userOrdersSlice.selectors,
  getUserOrders
};

export default userOrdersDepot;
