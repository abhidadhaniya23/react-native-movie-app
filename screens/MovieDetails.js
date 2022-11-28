import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants";
import { ScrollView } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { imageApi } from "../constants";
import TrendingMovies from "../components/TrendingMovies";
import API_KEY from "../env";

import firestore from "@react-native-firebase/firestore";

const MovieDetails = ({ navigation, route }) => {
  const monthConverter = (month) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "January";
    }
  };

  const [movieData, setMovieData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  const [likedMovie, setLikedMovie] = useState(false);
  const [cast, setCase] = useState([]);
  const { data } = route.params;
  const youtubeVideoApi = `https://api.themoviedb.org/3/${
    data.movie.media_type || "movie"
  }/${data.movie.id}/videos?api_key=${API_KEY}&language=en-US`;
  const movieDetailsApi = `https://api.themoviedb.org/3/${
    data.movie.media_type || "movie"
  }/${data.movie.id}?api_key=${API_KEY}&language=en-US`;
  const castDetailsApi = `https://api.themoviedb.org/3/${
    data.movie.media_type || "movie"
  }/${data.movie.id}/credits?api_key=${API_KEY}&language=en-US`;
  const fetchDetails = async () => {
    const details = await axios.get(movieDetailsApi);
    setGenre(details.data.genres);
    setMovieData(details.data);
  };
  const fetchVideoDetails = async () => {
    const videoDetails = await axios.get(youtubeVideoApi);
    console.log(videoDetails.data.results);
    setYtVideoId(videoDetails.data.results);
  };
  const fetchCast = async () => {
    const details = await axios.get(castDetailsApi);
    setCase(details.data.cast);
  };
  useEffect(() => {
    fetchDetails();
    fetchCast();
  }, [route.params]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Box position="absolute" top={0} left={0} zIndex={2} m="2">
            <IconButton
              onPress={() => navigation.goBack()}
              icon={
                <Icon
                  name={"ios-chevron-back-outline"}
                  size={24}
                  color={colors.light}
                />
              }
              variant="unstyled"
              rounded="full"
            ></IconButton>
          </Box>
          <Box position="absolute" top={0} right={0} zIndex={2} m="2">
            <IconButton
              onPress={() =>
                likedMovie ? setLikedMovie(false) : setLikedMovie(true)
              }
              icon={
                <Icon
                  name={likedMovie ? "heart-sharp" : "heart-outline"}
                  size={24}
                  color={likedMovie ? colors.light : colors.light}
                />
              }
              variant="unstyled"
              background={"transparent"}
              rounded="full"
            ></IconButton>
          </Box>
          <Box position={"relative"}>
            <Box
              position="absolute"
              bottom={"7"}
              right={"2"}
              zIndex={2}
              m="2"
              bg={colors.light}
              rounded="full"
            >
              <IconButton
                icon={
                  <Icon
                    name={"share-social-outline"}
                    size={24}
                    color={colors.primary}
                  />
                }
                variant="unstyled"
                rounded="full"
              ></IconButton>
            </Box>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w780${data.movie.poster_path}`,
              }}
              size="full"
              mb="5"
              h={"xl"}
              rounded="2xl"
              alt="logo"
            />
          </Box>
          <ScrollView horizontal={true}>
            <HStack space={2} alignItems="center" mt="2" mb="4" px="4">
              <Text
                bg={colors.primary}
                color={colors.light}
                px="4"
                pt={1.5}
                pb={1}
                rounded={"md"}
              >
                ⭐ {(data.movie.vote_average / 2).toFixed(1)}
              </Text>
              {genre.map((genre) => (
                <Text
                  key={genre.id}
                  bg={colors.secondary}
                  color={colors.light}
                  px="4"
                  pt={1.5}
                  pb={1}
                  rounded={"md"}
                >
                  {genre.name}
                </Text>
              ))}
              {movieData.adult && (
                <Text
                  bg={colors.secondary}
                  color={colors.primary}
                  px="4"
                  pt={1.5}
                  pb={1}
                  rounded={"md"}
                >
                  18+
                </Text>
              )}
            </HStack>
          </ScrollView>
          <VStack space={2} alignItems="flex-start" bg={"#000f1f"}>
            <Heading color={"white"} px="4">
              {data.movie.title || data.movie.name}
            </Heading>
            {/* Release in {movieData.release_date.split("-")[0] || movieData.first_air_date.split("-")[0]} 💠 {movieData.runtime / 60 > 1 ? `${Math.floor(movieData.runtime / 60)}h : ${movieData.runtime % 60}m` : `${movieData.runtime}m`} */}
            <HStack space={3} alignItems="center" px="4">
              <Text mr={-2}>💠</Text>
              <Text color={"white"}>
                {" "}
                {movieData === []
                  ? "Loading..."
                  : movieData.release_date && movieData.status === "Released"
                  ? `${monthConverter(
                      movieData.release_date.split("-")[1]
                    )} - ${movieData.release_date.split("-")[0]}`
                  : "Not Released"}
              </Text>
              <Text mr={-2}>{movieData.status === "Released" && "🕖"}</Text>
              <Text color={"white"}>
                {movieData.runtime
                  ? movieData.runtime / 60 > 1
                    ? `${Math.floor(movieData.runtime / 60)}h : ${
                        movieData.runtime % 60
                      }m`
                    : `${movieData.runtime}m`
                  : movieData.status === "Released" && "Loading..."}
              </Text>
            </HStack>
            <Text
              color={colors.light}
              opacity={0.7}
              px="4"
              onPress={() =>
                overviewExpanded
                  ? setOverviewExpanded(false)
                  : setOverviewExpanded(true)
              }
            >
              {overviewExpanded
                ? data.movie.overview
                : data.movie.overview.slice(0, 150)}
              {overviewExpanded ? "" : "..."}
              <Text color={colors.primary} opacity={1}>
                {" "}
                {overviewExpanded ? "Show Less" : "More"}
              </Text>
            </Text>

            <ScrollView horizontal={true}>
              <HStack
                space={2}
                alignItems="flex-start"
                justifyContent={"flex-start"}
                my={"2"}
                px="4"
              >
                {cast.map((cast) => {
                  if (cast.profile_path)
                    return (
                      <VStack
                        key={cast.id}
                        space={0}
                        alignItems="center"
                        w={"40"}
                        textAlign={"center"}
                      >
                        <Image
                          source={{
                            uri: `${
                              cast.profile_path
                                ? imageApi.CAST_IMG_API + cast.profile_path
                                : imageApi.castImgNotAvailable
                            }`,
                          }}
                          size="40"
                          mb="5"
                          h={"3xs"}
                          rounded="xl"
                          alt="logo"
                        />
                        <Text color={colors.light} opacity={0.8} mt={-3}>
                          {cast.name}
                        </Text>
                        <Text
                          color={colors.light}
                          opacity={0.3}
                          mt={-0.5}
                          w={"40"}
                          textAlign={"center"}
                        >
                          {cast.character.toLowerCase() === "self"
                            ? ""
                            : cast.character.includes("(")
                            ? cast.character.split("(")[0]
                            : cast.character.split("/")[0]}
                        </Text>
                      </VStack>
                    );
                })}
              </HStack>
            </ScrollView>
          </VStack>
          <TrendingMovies
            padding={false}
            page={Math.floor(Math.random() * 5)}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MovieDetails;
