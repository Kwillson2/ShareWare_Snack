import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
  console.log(`HomeScreen(): Top`),
  <Background>
    <Logo />
    <Header>Firebase Login</Header>

    <Paragraph>
      This template supports Firebase k authorization out of the box.
    </Paragraph>

    <Button mode="contained" onPress={() => navigation.navigate("Login")}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate("Register")}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
