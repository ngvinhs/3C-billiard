// import { Redirect, router, useNavigation } from "expo-router";
// import React, { useEffect } from "react";
// import { useGlobalContext } from "../context/GlobalProvider";
// import {
//   Image,
//   ImageBackground,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { StatusBar } from "expo-status-bar";

// const CustomUnmatchedRoute = () => {
//   //   const navigation = useNavigation();

//   //   useEffect(() => {
//   //     // Chuyển hướng về trang chủ
//   //     navigation.navigate("/");
//   //   }, []);
//   const { loading, isLogged } = useGlobalContext();

//   if (!loading && isLogged) return <Redirect href="/home" />;
//   return (
//     <View className="flex-1 items-center justify-center">
//       <ImageBackground
//         source={require("../assets/background.png")}
//         resizeMode="contain"
//         className="w-[100vw] h-[100vh] "
//       >
//         <View className="flex-1 items-center">
//           <Image
//             className="mt-[20%] w-[120px] h-[120px]"
//             source={require("../assets/3C-Icon.png")}
//           />
//         </View>

//         <View className="flex-1 bg-white rounded-3xl">
//           <View className="m-8">
//             <View>
//               <Text className="mt-3 text-3xl font-pbold text-blue-950">
//                 Chào mừng đến với
//               </Text>
//               <Text className="mt-3 text-4xl font-pbold text-primary">
//                 3C Billiard
//               </Text>
//               <Text className="text-gray-500 mt-4">Connect-Cue-Community</Text>
//             </View>

//             <View className="w-[84vw] pt-[15vh] ">
//               <View className="justify-around flex-row rounded-full border shadow-2xl">
//                 <TouchableOpacity
//                   onPress={() => {
//                     router.push("/signin");
//                   }}
//                   className="bg-primary rounded-full w-[50%] justify-center py-4 px-10"
//                 >
//                   <Text className=" text-center font-psemibold text-white">
//                     Đăng nhập
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => {
//                     router.push("/signup");
//                   }}
//                   className="w-[50%] justify-center py-4 px-10 "
//                 >
//                   <Text className="text-center text-primary font-semibold">
//                     Đăng kí
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ImageBackground>
//       <StatusBar style="auto" />
//     </View>
//   ); // Không hiển thị gì trên giao diện
// };

// export default CustomUnmatchedRoute;
import { Unmatched } from "expo-router";
export default Unmatched;
