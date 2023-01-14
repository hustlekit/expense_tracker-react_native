import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const ManageExpense = ({ route, navigation }) => {
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [ navigation, isEditing ]);
  
  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    await deleteExpense(editedExpenseId);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  
  const cancelHandler = () => {
    navigation.goBack();
  };
  
  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    if ( isEditing ) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  };
  
  if ( isSubmitting ) {
    return (
      <LoadingOverlay/>
    );
  }
  
  return (
    <View style={ styles.container }>
      <ExpenseForm
        onCancel={ cancelHandler }
        onSubmit={ confirmHandler }
        submitButtonLabel={ isEditing ? 'Update' : 'Add' }
        defaultValues={ selectedExpense }
      />
      { isEditing && (
        <View style={ styles.deleteContainer }>
          <IconButton
            icon={ 'trash' }
            color={ GlobalStyles.colors.error500 }
            size={ 36 }
            onPress={ deleteExpenseHandler }
          />
        </View>
      ) }
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.khakiWeb,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.camel,
    alignItems: 'center',
  },
});