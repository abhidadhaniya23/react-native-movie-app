import { Box, HStack, Text } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants";

const Tab = ({ screen, navigation }) => {
  const [activeTab, setActiveTab] = useState(
    screen === "home" ? "movies" : "search"
  );
  return (
    <>
      <HStack
        space={2}
        alignItems="center"
        justifyContent={"center"}
        mt={5}
        px={4}
      >
        <TouchableOpacity
          onPress={() => {
            activeTab === "movies"
              ? setActiveTab("search")
              : setActiveTab("movies");
            navigation.navigate("Home");
          }}
        >
          <Box
            background={
              activeTab == "movies" ? colors.primary : colors.secondary
            }
            rounded="full"
            px="4"
            py="1"
          >
            <Text color={colors.light} fontSize={"sm"}>
              Movies
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            activeTab === "search"
              ? setActiveTab("movies")
              : setActiveTab("search");
            // navigation.navigate("SearchMovies");
          }}
        >
          <Box
            background={
              activeTab == "search" ? colors.primary : colors.secondary
            }
            rounded="full"
            px="4"
            py="1"
          >
            <Text color={colors.light} fontSize={"sm"}>
              Search
            </Text>
          </Box>
        </TouchableOpacity>
      </HStack>
    </>
  );
};

export default Tab;
