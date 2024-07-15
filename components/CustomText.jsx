import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomText = (props) => {
  return (
    <View>
      <Text style={[styles.text, props.style]} {...props}>
        {props.children}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    alignSelf: "stretch",
  },
});
