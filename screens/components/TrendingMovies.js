import axios from "axios";
import { VStack, Heading, HStack } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import HorizontalMovieCard from "./HorizontalMovieCard";
import API_KEY from "../env";

const TrendingMovies = ({ padding, page }) => {
  const movieApi = {
    trendingMoviesApi: `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${
      page || 1
    }`,
  };
  const [movies, setMovies] = useState([]);
  const fetchTrendingMovies = async () => {
    const trendingMoviesData = await axios.get(movieApi.trendingMoviesApi);
    setMovies(trendingMoviesData.data.results);
  };
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <VStack space={1} alignItems="flex-start" py={padding ? "4" : "2"}>
      <Heading px={4} fontSize="xl" color="white">
        Trending Now
      </Heading>
      <ScrollView horizontal={true}>
        <HStack px={4} space={2} alignItems="center">
          {movies.map((movie) => (
            <HorizontalMovieCard key={movie.id} movie={movie} />
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default TrendingMovies;
