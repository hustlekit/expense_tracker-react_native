import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  
  return (
    <View style={ styles.container }>
      <Text style={ styles.period }>{ periodName }</Text>
      <Text style={ styles.sum }>${ expensesSum.toFixed(2) }</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 4,
    backgroundColor: GlobalStyles.colors.camel,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.rifleGreen,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.rifleGreen,
  },
});