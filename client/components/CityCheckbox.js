import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";

/*
fyi format:
city = { id: 1, city: "Atl", isChecked: false }
*/

const CityCheckbox = (props) => {
  const handleCity = props.handleCity;
  const cityId = props.city.id
  const value = props.city.isChecked
  const city = props.city.city;
  const [isChecked, setIsChecked] = useState(value);

  const handleChange = () => {
    // for showing the check and change box color:
    setIsChecked(!isChecked);
    // update city isChecked status from the parent file (FriendsMap):
    handleCity(cityId);
  };

  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={handleChange}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Text style={styles.paragraph}>{`${city}`}</Text>
    </View>
  );
};

export default CityCheckbox;

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
