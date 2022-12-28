import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  
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
  
  const confirmHandler = () => {
    if ( isEditing ) {
      expensesCtx.updateExpense(
        editedExpenseId,
        {
          description: 'Test!!!',
          amount: 29.99,
          date: new Date('2022-12-27'),
        });
    } else {
      expensesCtx.addExpense({
        description: 'Test',
        amount: 19.99,
        date: new Date('2022-12-28'),
      });
    }
    navigation.goBack();
  };
  
  return (
    <View style={ styles.container }>
      <View style={ styles.buttonContainer }>
        <Button style={ styles.button } mode={ 'flat' } onPress={ cancelHandler }>Cancel</Button>
        <Button style={ styles.button } onPress={ confirmHandler }>{ isEditing ? 'Update' : 'Add' }</Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.camel,
    alignItems: 'center',
  },
});