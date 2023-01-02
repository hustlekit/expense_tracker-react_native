import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { GlobalStyles } from '../../constants/styles';
import { useState } from 'react';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [ inputValues, setInputValues ] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });
  
  const inputChangeHandler = (inputIdentifier, value) => {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: value,
      };
    });
  };
  
  const submitHandler = () => {
    console.log(inputValues)
    console.log(inputValues.amount);
    console.log(typeof inputValues.amount);
    console.log(Number(inputValues.amount));
    console.log(typeof Number(inputValues.amount));
    const expenseData = {
      amount: Number(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    
    onSubmit(expenseData);
  };
  
  return (
    <View style={ styles.form }>
      <Text style={ styles.title }>Your Expense</Text>
      <View style={ styles.inputsRow }>
        <Input
          label={ 'Amount' }
          style={ styles.rowInput }
          textInputConfig={ {
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangeHandler('amount', value),
            value: inputValues.amount,
          } }
        />
        <Input
          label={ 'Date' }
          style={ styles.rowInput }
          textInputConfig={ {
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler('date', value),
            value: inputValues.date,
          } }
        />
      </View>
      <Input
        label={ 'Description' }
        textInputConfig={ {
          multiline: true,
          onChangeText: (value) => inputChangeHandler('description', value),
          value: inputValues.description,
        } }
      />
      <View style={ styles.buttonContainer }>
        <Button style={ styles.button } mode={ 'flat' } onPress={ onCancel }>Cancel</Button>
        <Button style={ styles.button } onPress={ submitHandler }>{ submitButtonLabel }</Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.grey500,
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});