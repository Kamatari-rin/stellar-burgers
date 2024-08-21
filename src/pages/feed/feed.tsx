import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import feedDepot, { getFeeds } from '../../services/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(feedDepot.selectIsPending);
  const orders = useSelector(feedDepot.selectOrders) || [];

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  return isPending ? (
    <Preloader />
  ) : (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
