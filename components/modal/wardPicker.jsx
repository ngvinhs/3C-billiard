import { View, Text } from "react-native";
import React, { useState } from "react";
import wards from "../../lib/address/xa_phuong.json";
const wardPicker = ({
  districtSearch,
  setDistrictSearch,
  addDistrict,
  parentCode,
}) => {
  const [selected, setSeleted] = useState();
  return (
    <View>
      <Picker
        selectedValue={setSeleted}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedDistrict(itemValue);
          addDistrict(itemValue);
        }}
      >
        {Object.entries(wards)
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

export default wardPicker;
