import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [ navigation, isEditing ]);
  
  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  
  const cancelHandler = () => {
    navigation.goBack();
  };
  
  const confirmHandler = (expenseData) => {
    if ( isEditing ) {
      expensesCtx.updateExpense(
        editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };
  
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
          <IconButton icon={ 'trash' }
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