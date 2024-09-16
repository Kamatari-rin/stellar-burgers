import clsx from 'clsx';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';
import styles from './constructor-page.module.css';
import ingredientsDepot from '../../services/ingredientsSlice';
import orderDepot from '../../services/orderSlice';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(ingredientsDepot.selectIsPending);
  const isOrderSending = useSelector(orderDepot.selectIsOrderSending);

  return (
    <>
      {isIngredientsLoading || isOrderSending ? (
        <Preloader />
      ) : (
        <main className={clsx('ConstructorPage', styles.containerMain)}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
