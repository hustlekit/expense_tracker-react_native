import { StatusBar } from 'expo-status-bar';
import ExpenseNavigator from './src/navigation/ExpenseNavigator';
import ExpensesContextProvider from './src/store/expenses-context';

export default function App() {
  return (
    <>
      <StatusBar style="light"/>
      <ExpensesContextProvider>
        <ExpenseNavigator/>
      </ExpensesContextProvider>
    </>
  );
}
