import axios from "axios";
import { Heading, HStack, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import HorizontalMovieCard from "./HorizontalMovieCard";
import API_KEY from "../env";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const movieApi = {
    popularFetch: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`,
  };
  const fetchPopularMovies = async () => {
    const popularMoviesData = await axios.get(movieApi.popularFetch);
    setMovies(popularMoviesData.data.results);
  };
  useEffect(() => {
    fetchPopularMovies();
  }, []);
  return (
    <VStack space={2} my={"5"} alignItems="flex-start">
      <Heading fontSize="xl" px="4" color="white">
        Popular Movies
      </Heading>
      <ScrollView horizontal={true}>
        <HStack px="4" space={2} alignItems="center">
          {movies.map((movie) => (
            <HorizontalMovieCard key={movie.id} movie={movie} />
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default PopularMovies;
