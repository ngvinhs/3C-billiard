import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
const SearchGroup = ({ setSearchData }) => {
  const [search, setSearch] = useState("");
  return (
    <View className="flex-row justify-between p-4 items-center w-[90vw] mx-auto border border-gray-400 rounded-lg ">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-row">
          <Feather name="search" size={24} color="gray" />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            className="ml-2"
            placeholder="Tìm kiếm"
            onBlur={() => setSearchData(search)}
          />
        </View>
      </TouchableWithoutFeedback>
      {/* <TouchableOpacity>
        <Image source={require("../../assets/filter.png")} />
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchGroup;
