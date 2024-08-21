import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import authDepot from './authSlice';
import feedDepot from './feedSlice';
import ingredientsDepot from './ingredientsSlice';
import orderDepot from './orderSlice';
import userOrdersDepot from './userOrdersSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsDepot.reducer,
    order: orderDepot.reducer,
    auth: authDepot.reducer,
    feed: feedDepot.reducer,
    userOrders: userOrdersDepot.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
