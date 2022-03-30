import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";

const Confirm = (props) => {
  const handleNoFilter = props.handleNoFilter;
  const handleFilterPage = props.handleFilterPage;
  const handleConfirmPage = props.handleConfirmPage;

  const handlePress = () => {
    handleNoFilter()
    handleFilterPage(false)
    handleConfirmPage(false)
  }

  return (
    <Modal isVisible={true}>
      <View style={styles.container}>

      <Text>Clear Filter?</Text>

        <Pressable
          style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
          onPress={handlePress}
        >
          <Text>Yes</Text>
        </Pressable>

        <Pressable
          onPress={() => handleConfirmPage(false)}
          style={{ ...styles.button, backgroundColor: "#4D96FF" }}
        >
          <Text>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 350,
    height: 500,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
});
