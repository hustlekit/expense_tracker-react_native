import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';
import { ExpensesContext } from '../store/expenses-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

const RecentExpenses = () => {
  const [ isFetching, setIsFetching ] = useState(false);
  const [ error, setError ] = useState();
  
  const expensesCtx = useContext(ExpensesContext);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch ( error ) {
        setError('Could not fetch expenses');
      }
      setIsFetching(false);
    };
    
    fetchExpenses();
  }, []);
  
  if ( error && !isFetching ) {
    return (
      <ErrorOverlay message={ error }/>
    );
  }
  
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