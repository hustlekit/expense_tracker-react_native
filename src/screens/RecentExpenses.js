import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect } from 'react';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';
import { ExpensesContext } from '../store/expenses-context';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpenses();
      expensesCtx.setExpenses(expenses);
    }
    
    fetchExpenses();
  }, [])
  
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateAgo = getDateMinusDays(today, 7);
    return expense.date >= dateAgo;
  });
  
  return (
    <ExpensesOutput
      expenses={ recentExpenses }
      expensesPeriod={ 'Last 7 days' }
      fallbackText={'No expenses registered for the last 7 days.'}
    />
  );
};

export default RecentExpenses;