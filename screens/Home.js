import { ScrollView, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Tab from "../components/Tab";
import TrendingMovies from "../components/TrendingMovies";
import GenreMovies from "../components/GenreMovies";
import PopularMovies from "../components/PopularMovies";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Tab screen={"home"} navigation={navigation} />
          <TrendingMovies padding={true} />
          <GenreMovies />
          <PopularMovies />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
