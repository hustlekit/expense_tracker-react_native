import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';
import { ExpensesContext } from '../store/expenses-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const RecentExpenses = () => {
  const [ isFetching, setIsFetching ] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsFetching(true);
      const expenses = await getExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    };
    
    fetchExpenses();
  }, []);
  
  if ( isFetching ) {
    return (
      <LoadingOverlay/>
    );
  }
  
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateAgo = getDateMinusDays(today, 7);
    return expense.date >= dateAgo;
  });
  
  return (
    <ExpensesOutput
      expenses={ recentExpenses }
      expensesPeriod={ 'Last 7 days' }
      fallbackText={ 'No expenses registered for the last 7 days.' }
    />
  );
};

export default RecentExpenses;