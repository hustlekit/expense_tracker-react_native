import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-18'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.97,
    date: new Date('2022-09-04'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-21'),
  },
  {
    id: 'e4',
    description: 'An apple',
    amount: 0.87,
    date: new Date('2022-12-15'),
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 14.97,
    date: new Date('2022-11-21'),
  },
  {
    id: 'e6',
    description: 'A book',
    amount: 24.97,
    date: new Date('2022-12-21'),
  },
  {
    id: 'e7',
    description: 'A book',
    amount: 19.97,
    date: new Date('2022-12-26'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {
  },
  deleteExpense: (id) => {
  },
  updateExpense: (id, { description, amount, date }) => {
  },
});

const expensesReducer = (state, action) => {
  switch ( action.type ) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [ { ...action.payload, id: id }, ...state ];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [ ...state ];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [ expensesState, dispatch ] = useReducer(expensesReducer, DUMMY_EXPENSES);
  
  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };
  
  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };
  
  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  };
  
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  
  return (
    <ExpensesContext.Provider value={ value }>
      { children }
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;