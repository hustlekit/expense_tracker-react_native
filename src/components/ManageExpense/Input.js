import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, style, invalid, textInputConfig }) => {
  
  const inputStyles = [ styles.input ];
  
  if ( textInputConfig && textInputConfig.multiline ) {
    inputStyles.push(styles.inputMultiline);
  }
  
  if ( invalid ) {
    inputStyles.push(styles.invalidInput);
  }
  
  return (
    <View style={ [ styles.inputContainer, style ] }>
      <Text style={ [ styles.label, invalid && styles.invalidLabel ] }>{ label }</Text>
      <TextInput style={ inputStyles } { ...textInputConfig } />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.laurelGreen,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});