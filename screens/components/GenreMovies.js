import axios from "axios";
import { Heading, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { colors } from "../constants";
import HorizontalMovieCard from "./HorizontalMovieCard";
import API_KEY from "../env";

const GenreMovies = () => {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState(28);
  const [genreMovies, setGenreMovies] = useState([]);

  const movieApi = {
    genreFetch: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}&page=1`,
    popularFetch: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`,
    genreListFetch: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  };

  const fetchGenreList = async () => {
    const genreList = await axios.get(movieApi.genreListFetch);
    setGenres(genreList.data.genres);
  };
  const fetchGenreMovies = async () => {
    const genreMovies = await axios.get(movieApi.genreFetch);
    setGenreMovies(genreMovies.data.results);
  };
  useEffect(() => {
    fetchGenreList();
  }, []);
  useEffect(() => {
    fetchGenreMovies();
  }, [genreId]);

  return (
    <VStack space={2} my={"2"} alignItems="flex-start">
      <HStack
        space={0}
        alignItems="flex-end"
        px="4"
        justifyContent={"space-between"}
        w="full"
      >
        <Heading fontSize="xl" color="white">
          Genres
        </Heading>
        <TouchableOpacity activeOpacity={0.7}>
          <Text color="white" opacity={0.7}>
            See All
          </Text>
        </TouchableOpacity>
      </HStack>
      <ScrollView horizontal={true}>
        <HStack px="4" space={2} my={"2"} alignItems="flex-start">
          {genres.map((genre, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={genre.id}
              onPress={() => setGenreId(genre.id)}
            >
              <Text
                bg={genreId === genre.id ? colors.primary : colors.secondary}
                color={index === 0 ? colors.light : colors.light}
                px="4"
                py={1}
                rounded={"md"}
              >
                {genre.name}
              </Text>
            </TouchableOpacity>
          ))}
        </HStack>
      </ScrollView>
      <ScrollView horizontal={true}>
        <HStack px="4" space={2} my={"2"} alignItems="flex-start">
          {genreMovies.map((movie) => {
            if (movie.backdrop_path)
              return <HorizontalMovieCard key={movie.id} movie={movie} />;
          })}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default GenreMovies;
