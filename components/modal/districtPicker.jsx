import { View, Text } from "react-native";
import React, { useState } from "react";
import districts from "../../lib/address/quan_huyen.json";
import { Picker } from "@react-native-picker/picker";

const DistrictPicker = ({
  districtSearch,
  setDistrictSearch,
  addDistrict,
  parentCode,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState();
  return (
    <View>
      <Picker
        selectedValue={selectedDistrict}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedDistrict(itemValue);
          addDistrict(itemValue);
        }}
      >
        {Object.entries(districts)
          .filter(([code, district]) => district.parent_code === parentCode)
          .map(([code, { name, name_with_type }]) => (
            <Picker.Item key={code} label={name_with_type} value={name} />
          ))}

        {/* {provinces.map((province) => (
        <Picker.Item
          key={province.code}
          label={province.name}
          value={province.code}
        />
      ))} */}
      </Picker>
    </View>
  );
};

export default DistrictPicker;
