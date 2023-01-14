import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../util/http';

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
  
  const confirmHandler = async (expenseData) => {
    if ( isEditing ) {
      expensesCtx.updateExpense(
        editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
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