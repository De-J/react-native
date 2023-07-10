import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Example() {
  const [name, setName] = useState("Dev")
  const [person, setPerson] = useState({
    name: "Person",
    age: 40
  })
  
  
  const pressHandler = () => {
    setName("Peter Parker")
  }
  
  return (
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
  },
  btnContainer: {
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    padding: 5,
  }
});