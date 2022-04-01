import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import Modal from "react-native-modal";
import CatCheckbox from "./CatCheckbox";
import CityCheckbox from "./CityCheckbox";
import Confirm from "./Confirm";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const Filter = (props) => {
  const categoryList = props.categoryList;
  const cityList = props.cityList;
  const handleNoFilter = props.handleNoFilter;
  const handleFilterPage = props.handleFilterPage;
  const handleCat = props.handleCat;
  const handleCity = props.handleCity;
  const handleMaxDistance = props.handleMaxDistance;
  const handleIsFreeChecked = props.handleIsFreeChecked;
  const value = props.isFreeChecked;
  const maxDistance = props.maxDistance;
  const [confirmPage, setConfirmPage] = useState(false);
  const [isFreeChecked, setIsFreeChecked] = useState(value);
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([maxDistance]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);

  const sliderOneValuesChange = (values) => setSliderOneValue(values);

  const sliderOneValuesChangeFinish = () => {
    setSliderOneChanging(false);
    handleMaxDistance(sliderOneValue);
  };

  const handleConfirmPage = (boolean) => {
    setConfirmPage(boolean);
  };

  return (
    <Modal isVisible={true}>
      <View style={styles.container}>
        <Pressable
          onPress={() => props.handleFilterPage(false)}
          style={{ alignSelf: "flex-end", margin: 10 }}
        >
          <Text>{"[close x]"}</Text>
        </Pressable>

        <Text>Categories:</Text>
        <ScrollView style={styles.catContainer}>
          {categoryList.map((category, idx) => {
            return (
              <CatCheckbox
                key={idx}
                category={category}
                handleCat={handleCat}
              />
            );
          })}
        </ScrollView>

        <Text>Cities:</Text>
        <ScrollView>
          {cityList.map((city, idx) => {
            return (
              <CityCheckbox key={idx} city={city} handleCity={handleCity} />
            );
          })}
        </ScrollView>
        
        <View style={styles.slideContainer}>
          <Text>Maximum Distance: {sliderOneValue} miles</Text>
          <MultiSlider
            values={sliderOneValue}
            sliderLength={280}
            min={1}
            max={10}
            step={1}
            onValuesChangeStart={sliderOneValuesChangeStart}
            onValuesChange={sliderOneValuesChange}
            onValuesChangeFinish={sliderOneValuesChangeFinish}
            selectedStyle={{
              backgroundColor: "#4630EB",
            }}
            showStepMarkers={true}
          />
        </View>

        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isFreeChecked}
            onValueChange={handleIsFreeChecked}
            color={isFreeChecked ? "#4630EB" : undefined}
          />
          <Text style={styles.paragraph}>Show only Free events</Text>
        </View>

        <Pressable
          style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
          onPress={() => handleConfirmPage(true)}
        >
          <Text>Clear Filter</Text>
        </Pressable>
      </View>
      {confirmPage ? (
        <Confirm
          handleNoFilter={handleNoFilter}
          handleFilterPage={handleFilterPage}
          handleConfirmPage={handleConfirmPage}
        />
      ) : null}
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    // alignItems: "center",
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
  text: {
    alignSelf: "center",
    paddingVertical: 20,
  },
  slideContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  sliderOne: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  catContainer: {
    flex: 1,
    flexDirection: "column",
    height: "35%",
  },
});
