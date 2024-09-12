import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import authDepot from '../services/authSlice';
import feedDepot from '../services/feedSlice';
import ingredientsDepot from '../services/ingredientsSlice';
import orderDepot from '../services/orderSlice';
import userOrdersDepot from '../services/userOrdersSlice';

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
