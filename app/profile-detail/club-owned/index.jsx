import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CardCLB from "../../../components/clb/CardCLB";
import { router, useFocusEffect } from "expo-router";
import { getBidaClubByUserID } from "../../../lib/action/bidaclubs";
import { useGlobalContext } from "../../../context/GlobalProvider";

const ClubOwned = () => {
  const { user } = useGlobalContext();
  const [bidaClub, setBidaClub] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getBidaClub = async (id) => {
    setLoading(true);
    try {
      const response = await getBidaClubByUserID(id);
      setBidaClub(response);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getBidaClub(user.userid);
  // }, []);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    getBidaClub(user.userid).finally(() => setIsRefreshing(false));
  }, [user.userid]);

  useFocusEffect(
    useCallback(() => {
      getBidaClub(user.userid);
    }, [user.userid])
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      className="bg-white "
    >
      <View className="h-[100vh]">
        {loading && !isRefreshing && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#E12727" />
          </View>
        )}
        <View className="mx-2">
          {bidaClub
            .filter((item) => item.status !== "INACTIVE")
            .map((item) => {
              return (
                <CardCLB key={item.id} isRefreshing={loading} data={item} />
              );
            })}
          {bidaClub.length === 0 && (
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg">Bạn chưa có CLB nào</Text>
            </View>
          )}
        </View>
        <View className="items-center fixed bottom-0 w-[100vw]">
          <TouchableOpacity
            onPress={() => {
              router.push("/profile-detail/club-register");
            }}
            className="bg-primary w-[90%] items-center mx-2 py-4 rounded-3xl border-2 border-primary"
          >
            <Text className="font-pbold text-white">Đăng kí CLB</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ClubOwned;
