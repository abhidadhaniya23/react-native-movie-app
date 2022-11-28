import React, { useContext, useEffect, useState } from "react";
import { Text, Center, Heading, VStack } from "native-base";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import UserContext from "../context/UserContext";

const GetStarted = () => {
  GoogleSignin.configure({
    webClientId:
      "321286477050-q56da6rg7cf970r9o90htnsn70vb17jm.apps.googleusercontent.com",
  });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const { user, setUser } = useContext(UserContext);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  return (
    <>
      <Center flex={1}>
        <Image
          source={require("../assets/movie.png")}
          style={{
            width: "100%",
            height: "65%",
            marginTop: -20,
            marginBottom: 20,
            resizeMode: "contain",
          }}
          alt="logo"
        />
        <VStack space={5} alignItems="flex-start">
          <VStack space={1} alignItems="flex-start">
            <Heading
              w="full"
              px="10"
              textAlign={"left"}
              background="amber.300"
              fontSize={"4xl"}
              color="white"
            >
              Movie App
            </Heading>
            <Text px="10" color="white" opacity={0.6}>
              Enjoy with your favorite movies and t.v. shows at only one place.
            </Text>
          </VStack>
          <VStack space={2} alignItems="center" px="10">
            {user ? (
              <>
                <Btn
                  text="Get Started"
                  action={() => navigation.navigate("Home")}
                />
                <Btn text="Sign out" action={signOut} type="solid" />
              </>
            ) : (
              <Btn text="Continue with Google" action={signIn} />
            )}
          </VStack>
        </VStack>
      </Center>
    </>
  );
};

const Btn = (props) => {
  return (
    <>
      {props.type === "solid" ? (
        <TouchableOpacity
          activeOpacity={0.4}
          // onPress={() => navigation.navigate("Home")}
          onPress={props.action}
        >
          <Text
            alignSelf="center"
            borderWidth={1}
            borderColor={colors.primary}
            color={colors.light}
            bg={colors.primary}
            rounded={"md"}
            w="xs"
            py="3"
            fontSize={"lg"}
            textAlign={"center"}
          >
            {props.text}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.4}
          // onPress={() => navigation.navigate("Home")}
          onPress={props.action}
        >
          <Text
            alignSelf="center"
            borderWidth={1}
            borderColor={colors.primary}
            color={colors.primary}
            rounded={"md"}
            w="xs"
            py="3"
            fontSize={"lg"}
            textAlign={"center"}
          >
            {props.text}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default GetStarted;
