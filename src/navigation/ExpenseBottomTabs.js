import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import { Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/ui/IconButton';

const BottomTabs = createBottomTabNavigator();

const ExpenseBottomTabs = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={ ({ navigation }) => ( {
        headerStyle: { backgroundColor: GlobalStyles.colors.coyoteBrown },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.coyoteBrown },
        tabBarActiveTintColor: 'white',
        headerRight: ({ tintColor }) =>
          <IconButton
            icon={ "add" }
            size={ 24 }
            color={ tintColor }
            onPress={ () => {
              navigation.navigate('ManageExpense');
            } }
          />,
      } ) }
    >
      <BottomTabs.Screen
        name={ 'RecentExpenses' }
        component={ RecentExpenses }
        options={ {
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name={ 'hourglass' } size={ size } color={ color }/>,
        } }
      />
      <BottomTabs.Screen
        name={ 'AllExpenses' }
        component={ AllExpenses }
        options={ {
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name={ 'calendar' } size={ size } color={ color }/>,
        } }
      />
    </BottomTabs.Navigator>
  );
};

export default ExpenseBottomTabs;