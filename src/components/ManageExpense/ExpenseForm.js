import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { GlobalStyles } from '../../constants/styles';
import { useState } from 'react';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [ inputs, setInputs ] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });
  
  const inputChangeHandler = (inputIdentifier, value) => {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: value, isValid: true },
      };
    });
  };
  
  const submitHandler = () => {
    const expenseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;
    
    if ( !amountIsValid || !dateIsValid || !descriptionIsValid ) {
      setInputs(currInputs => {
        return {
          amount: {
            value: currInputs.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: currInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    
    onSubmit(expenseData);
  };
  
  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
  
  return (
    <View style={ styles.form }>
      <Text style={ styles.title }>Your Expense</Text>
      <View style={ styles.inputsRow }>
        <Input
          label={ 'Amount' }
          style={ styles.rowInput }
          invalid={ !inputs.amount.isValid }
          textInputConfig={ {
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangeHandler('amount', value),
            value: inputs.amount.value,
          } }
        />
        <Input
          label={ 'Date' }
          style={ styles.rowInput }
          invalid={ !inputs.date.isValid }
          textInputConfig={ {
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler('date', value),
            value: inputs.date.value,
          } }
        />
      </View>
      <Input
        label={ 'Description' }
        invalid={ !inputs.description.isValid }
        textInputConfig={ {
          multiline: true,
          onChangeText: (value) => inputChangeHandler('description', value),
          value: inputs.description.value,
        } }
      />
      { formIsInvalid && (
        <Text style={ styles.errorText }>
          Invalid input values - please check your data!
        </Text>
      ) }
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    marginBottom: 16,
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