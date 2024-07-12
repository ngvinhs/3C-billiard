import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const TextField = ({
  placeholder,
  icon,
  fieldName,
  inputStyle,
  value,
  handleChangeText,
  hidePassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className="mt-2">
      <Text className="text-lg text-gray-500">{fieldName}</Text>
      <View className=" border-b-2 border-gray-300 w-[100%] flex-row justify-between">
        <TextInput
          placeholder={placeholder}
          onChangeText={handleChangeText}
          value={value}
          className="text-lg pt-3 w-[90%] mb-1"
          secureTextEntry={hidePassword && !showPassword}
          {...props}
        />
        {hidePassword && (
          <TouchableOpacity
            className="ml-1 items-center justify-center w-10 h-10"
            onPress={() => setShowPassword(!showPassword)}
          >
            {/* <Image
              source={
                !showPassword ? (
                  <FontAwesome name="eye" size={24} color="black" />
                ) : (
                  icons.eyeHide
                )
              }
              className="w-6 h-6"
              resizeMode="contain"
            /> */}
            {!showPassword ? (
              <FontAwesome name="eye" size={20} color="gray" />
            ) : (
              <FontAwesome name="eye-slash" size={20} color="gray" />
            )}
          </TouchableOpacity>
        )}
        <Image source={icon} className="mt-4" />
      </View>
    </View>
  );
};

export default TextField;
