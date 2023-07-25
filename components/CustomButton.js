import { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

class CustomButton extends Component {
  constructor() {
    super();
    this.state = {
      title: "submit"
    }
  }

  changeTitle = (str) => {
    this.setState({ title: str });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{this.state.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  }
})

export default CustomButton;