import { forwardRef, useImperativeHandle, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CustomButton = forwardRef(({ onPress, disabled }, ref) => {
    const [title, setTitle] = useState("submit");
    useImperativeHandle(ref, () => {
        return {
            changeTitle(str) {
                setTitle(str);
            },
            print() {
                console.log(title);
            }
        }
    })
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
});

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