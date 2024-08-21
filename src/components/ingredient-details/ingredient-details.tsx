import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { redirect, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import ingredientsDepot from '../../services/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { _id } = useParams<{ _id: string }>();
  if (!_id) {
    redirect('/');
    return null;
  }

  const ingredients = useSelector(ingredientsDepot.selectIngredients) || [];

  const ingredientData = ingredients.find((x) => x._id === _id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
