import { VStack, Image, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { colors, imageApi } from "../constants";
import { useNavigation } from "@react-navigation/native";

const HorizontalMovieCard = (props) => {
  const navigation = useNavigation();
  const { IMG_API } = imageApi;
  return (
    <>
      {!props ? (
        <Text>Loading...</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MovieDetails", { data: props })}
        >
          <VStack
            space={2}
            alignItems="center"
            bg={colors.secondary}
            rounded={"xl"}
            p="1"
          >
            <Image
              source={{ uri: `${IMG_API + props.movie.backdrop_path}` }}
              size="64"
              h={"40"}
              rounded="xl"
              alt="logo"
            />
            <Text w={"64"} textAlign="center" color={"white"}>
              {props.movie.title || props.movie.name}
            </Text>
          </VStack>
        </TouchableOpacity>
      )}
    </>
  );
};

export default HorizontalMovieCard;
