import React, { useState, useEffect } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  NativeBaseProvider,
  ScrollView,
  Center,
  Heading,
  Button,
  Box,
  VStack,
  FormControl,
  Input,
  Spacer,
  Select,
  CheckIcon,
  Flex,
  TextArea,
} from "native-base";

import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-modern-datepicker";
import Constants from "../../../constants/Constants";

export default function CreateRequest({ navigation }) {
  const [formData, setData] = React.useState({});
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    //this tells the application to give an alert if someone doesn't allow //permission.  It will return to the previous screen.
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let base64Img = `data:image/jpg;base64,${result.base64}`;
    uploadImage(base64Img);
  };

  //image upload start
  const uploadImage = (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "Chat-app");

    fetch("https://api.cloudinary.com/v1_1/donfmtaf4/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (title === "") {
      Alert.alert("Please enter a title");
      return;
    } else if (category === "") {
      Alert.alert("Please enter a category");
      return;
    } else if (location === "") {
      Alert.alert("Please enter a location");
      return;
    } else if (description === "") {
      Alert.alert("Please enter a description");
    } else if (image === null) {
      Alert.alert("Please upload an image");
      return;
    }

    const data = {
      title,
      category,
      location,
      description,
      image,
    };

    var url = `${Constants.URL}/api/requests/`;

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        Alert.alert("requests added successfully");
        navigation.navigate("RequestDashboard")
      })
      .catch((err) => {
        console.log(err);
      });

    setTitle("");
    setCategory("");
    setLocation("");
    setDescription("");
    setImage(null);
  };

  return (
    <NativeBaseProvider style={styles.main1}>
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
        shadow={3}
      >
        REQUEST EVENT
      </Box>
      <Button
        shadow={3}
        onPress={() => navigation.navigate("RequestInstructions")}
        _text={{
          color: "white",
          fontSize: "lg",
          alignSelf: "center",
          fontWeight: "medium",
          letterSpacing: "lg",

          shadow: 3,
        }}
        style={styles.helpBtn}
      >
        Help ?
      </Button>

      <ScrollView style={styles.main}>
        <VStack style={styles.border}>
          <VStack width="90%" mx="3" ml={6} maxW="350px" alignSelf="center">
            <FormControl isRequired>
              <Box maxW="350" mt="5">
              <View >
            <Image
              style={styles.image}
              source={require("../../../assets/images/add_req.png")}
            />
          </View>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Request Category
                </FormControl.Label>
                <Select
                  minWidth="200"
                  borderColor={"#000"}
                  selectedValue={category}
                  height={12}
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Service"
                  _selectedItem={{
                    bg: "green",
                    endIcon: <CheckIcon size="5" />,
                    fontSize: "lg",
                    fontWeight: "bold",
                  }}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  mt={1}
                >
                  <Select.Item label="Charity Service" value="charity" />
                  <Select.Item label="Planting" value="planting" />
                  <Select.Item label="Repairs" value="repair" />
                </Select>
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Request Title
              </FormControl.Label>
              <Input
                placeholder="Event Title"
                borderColor={"#000"}
                height={12}
                onChangeText={(value) => setTitle(value)}
              />
            </FormControl>
            <FormControl isRequired mt={5}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Request Location
              </FormControl.Label>
              <Input
                placeholder="Event Location"
                borderColor={"#000"}
                height={12}
                onChangeText={(value) => setLocation(value)}
              />
            </FormControl>
          </VStack>
          <TouchableOpacity style={styles.imageCon} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image1} />
            ) : (
              <Image
                source={require("../../../assets/images/upload.png")}
                style={styles.image2}
              />
            )}
          </TouchableOpacity>
          <Spacer />
          <VStack width="90%" mx="3" ml={6} maxW="350px" alignSelf="center">
            <FormControl isRequired mt={5}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Request Description
              </FormControl.Label>
              <TextArea
                placeholder="Event Location"
                borderColor={"#000"}
                w="100%"
                onChangeText={(value) => setDescription(value)}
              />
            </FormControl>
            <Button style={styles.uploadButton} onPress={handleSubmit}>
              <Text style={styles.uploadButtonText}> Create Request</Text>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 12,
    padding: 10,
    backgroundColor: "rgba(26, 182, 92, 1)",
    width: "45%",
    marginLeft: "auto",
    height: 70,
  },
  uploadButtonText: {
    color: "#f6f5f8",
    fontSize: 20,
  },
  main1: {
    backgroundColor: "white",
  },
  border: {
    borderWidth: 2,
    borderColor: "green",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: "10%",
    backgroundColor: "white",
  },
  main: {
    marginTop: "10%",
    height: "100%",
  },
  image1: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  imageCon: {
    marginTop: 20,
    borderRadius: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,

    backgroundColor: "white",
    width: "90%",
    height: 300,
    marginBottom: 20,
  },
  image2: {
    width: "100%",
    resizeMode: "contain",
    height: "100%",
  },
  header: {
    backgroundColor: "rgba(230, 255, 214, 1)",
    width: "90%",
    alignSelf: "center",
    height: 60,
  },
  helpBtn: {
    backgroundColor: "rgba(26, 182, 92, 1)",
    width: "20%",
    alignSelf: "center",
    marginLeft: "70%",
    marginTop: "6%",
    color: "black",
    height: 70,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    zIndex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
