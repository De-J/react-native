import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';


export default function Example() {
  const ref = useRef(null);
  const [name, setName] = useState("Dev")
  const [person, setPerson] = useState({
    name: "Person",
    age: 40
  })
  
  useEffect(() => {
    ref.current.changeTitle("search");
    ref.current.print();
  }, []);
  
  
  const pressHandler = () => {
    setName("Peter Parker")
  }
  
  return (
    <View>
      <CustomButton ref={ref}/>
    </View>
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