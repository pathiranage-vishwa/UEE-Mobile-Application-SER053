import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Constants from "../../../constants/Constants";
import axios from "axios";
import {
  VStack,
  Image,
  Input,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  FlatList,
  Box,
  Divider,
  Heading,
  ScrollView,
  Card,
  Flex,
  Stack,
  Container,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Comments({ route, navigation }) {
  const [event, setEvent] = React.useState(route.params.item);
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    axios
      .get(`${Constants.URL}/api/comments/${event._id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [comments]);

  return (
    <NativeBaseProvider>
      <Box
        p="2"
        alignSelf={{ base: "center", md: "flex-start" }}
        mt="20%"
        rounded="xl"
        style={styles.header}
        _text={{
          fontSize: "32",
          fontWeight: "medium",
          color: "black",
          alignSelf: "center",
          letterSpacing: "lg",
        }}
      >
        {event.name}
      </Box>
      <ScrollView>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.card} key={item._id} shadow={1}>
              <Flex direction="row">
                <Stack space={2} p="4" w="100%">
                  <Heading size="sm" ml="-1" style={styles.title1}>
                    -- {item.name} --
                  </Heading>

                  <Text style={styles.sub1}>{item.comment}</Text>
                </Stack>
              </Flex>
            </View>
          )}
        />

        <Button
          style={styles.button3}
          backgroundColor={"rgba(26, 182, 92, 1)"}
          onPress={() =>
            navigation.navigate(
              "AddComment",

              { item: event }
            )
          }
        >
          <Text style={styles.text1}> Add Comment</Text>
        </Button>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(230, 255, 214, 1)",
    height: 60,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 22,
    borderRadius: 10,
  },

  button1: {
    marginTop: 20,
    width: "24%",
    marginLeft: -10,
    marginRight: 10,
    margin: 10,
    borderRadius: 10,
    height: 50,
  },
  button2: {
    marginTop: 20,
    borderColor: "red",
    borderWidth: 2,
    width: "24%",
    borderRadius: 10,
    margin: 10,
  },

  title1: {
    margin: 1,
    fontSize: 22,
    padding: 5,
    alignItems: "center",
    paddingLeft: 14,
    width: "60%",
    paddingTop: 10,
  },
  date: {
    color: "rgba(26, 182, 92, 1)",
  },
  sub: {
    fontWeight: "bold",
    fontSize: 16,
    width: "50%",
  },
  sub1: {
    marginTop: 0,
    fontWeight: "bold",
    fontSize: 18,
    width: "100%",
  },
  sub2: {
    fontWeight: "bold",
    color: "orange",
  },

  image: {
    width: 160,
    height: 230,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
  },
  card: {
    width: "92%",
    marginBottom: 20,
    marginLeft: "4%",
    marginRight: "4%",
    height: "auto",
    paddingBottom: 0,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  text2: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  button3: {
    marginTop: "5%",
    width: "35%",
    alignSelf: "center",
    marginBottom: 20,
    marginRight: 10,
    margin: 10,
    borderRadius: 10,
    height: 40,
  },
});
