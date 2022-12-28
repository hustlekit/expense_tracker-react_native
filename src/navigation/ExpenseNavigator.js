import { NavigationContainer } from '@react-navigation/native';
import ExpenseStack from './ExpenseStack';

const ExpenseNavigator = () => {
  return (
    <NavigationContainer>
      <ExpenseStack/>
    </NavigationContainer>
  )
}

export default ExpenseNavigator;