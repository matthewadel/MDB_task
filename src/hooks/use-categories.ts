import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

import { deleteCategory as deleteCategoryFromRedux } from '@/store';
import { addCategory } from '@/store';
import { ICategory } from '@/types';
import { closeAlert, showAlert } from '@/ui';
const useCategories = () => {
  const dispatch = useDispatch();

  const createCategory = (categoryName: string) => {
    dispatch(addCategory({ label: categoryName }));
    showMessage({
      message: 'Category Created Successfully',
    });
  };

  const deleteCategory = (category: ICategory) => {
    showAlert({
      title: 'Are you sure?',
      message: `${category.label} Category Will Be Deleted!`,
      alertType: 'warning',
      onPress: () => deleteCategoryByID(category),
    });
  };

  const deleteCategoryByID = (category: ICategory) => {
    dispatch(deleteCategoryFromRedux({ id: category.id }));
    closeAlert();
    setTimeout(() => {
      showMessage({
        message: 'Category Deleted Successfully',
      });
    }, 100);
  };

  return { createCategory, deleteCategory };
};

export { useCategories };
