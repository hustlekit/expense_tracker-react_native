import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from '../screens/ManageExpense';
import ExpenseBottomTabs from './ExpenseBottomTabs';
import { GlobalStyles } from '../constants/styles';

const Stack = createNativeStackNavigator();

const ExpenseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={ {
        headerStyle: { backgroundColor: GlobalStyles.colors.coyoteBrown },
        headerTintColor: 'white',
      } }
    >
      <Stack.Screen
        name={ 'ExpenseBottomTabs' }
        component={ ExpenseBottomTabs }
        options={ { headerShown: false } }
      />
      <Stack.Screen
        name={ 'ManageExpense' }
        component={ ManageExpense }
        options={ {
          presentation: 'modal',
        } }
      />
    </Stack.Navigator>
  );
};

export default ExpenseStack;