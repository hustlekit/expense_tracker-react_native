import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();
  
  const expensePressedHandler = () => {
    navigation.navigate('ManageExpense', {
      expenseId: id
    });
  };
  
  return (
    <Pressable onPress={ expensePressedHandler } style={ ({ pressed }) => pressed && styles.pressed }>
      <View style={ styles.expenseItem }>
        <View>
          <Text style={ [ styles.textBase, styles.description ] }>{ description }</Text>
          <Text style={ styles.textBase }>{ getFormattedDate(date) }</Text>
        </View>
        <View style={ styles.amountContainer }>
          <Text styles={ styles.amount }>{ amount.toFixed(2) }</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.camel,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.grey500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.laurelGreen,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.laurelGreen,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});