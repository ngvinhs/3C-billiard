import { View, Text } from "react-native";
import React, { useState } from "react";
import provinces from "../../lib/address/tinh_tp.json";
import { Picker } from "@react-native-picker/picker";

const ProVincePicker = ({ provinceSearch, setProvinceSearch, addProvince }) => {
  const [selectedProvince, setSelectedProvince] = useState();

  return (
    <Picker
      selectedValue={selectedProvince}
      onValueChange={(itemValue, itemIndex) => {
        setSelectedProvince(itemValue);
        addProvince(itemValue);
      }}
    >
      {Object.entries(provinces).map(([code, { name, name_with_type }]) => (
        <Picker.Item key={code} label={name_with_type} value={[code, name]} />
      ))}
    </Picker>
  );
};

export default ProVincePicker;
