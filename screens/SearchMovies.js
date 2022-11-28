import { ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Tab from "../components/Tab";

const SearchMovies = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <Tab screen={"search"} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchMovies;
