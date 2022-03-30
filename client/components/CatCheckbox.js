import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";

/*
fyi format:
category = { id: 1, type: "Music", isChecked: false }
*/

const CatCheckbox = (props) => {
  const category = props.category;
  const handleCat = props.handleCat;
  const catId = props.category.id
  const value = props.category.isChecked
  const type = props.category.type;
  const [isChecked, setIsChecked] = useState(value);

  const handleChange = () => {
    // for showing the check and change box color:
    setIsChecked(!isChecked);
    // update category isChecked status from the parent file (FriendsMap):
    handleCat(catId);
  };

  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={handleChange}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Text style={styles.paragraph}>{`${type}`}</Text>
    </View>
  );
};

export default CatCheckbox;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 16,
  },
  checkbox: {
    margin: 8,
  },
});
