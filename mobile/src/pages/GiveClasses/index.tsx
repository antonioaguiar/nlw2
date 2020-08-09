import React from "react";
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import giveClassesBackgroundImg from "../../assets/images/give-classes-background.png";

function GiveClasses() {
  const navigation = useNavigation();

  function handleNavigationToBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBackgroundImg}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um proffy?</Text>

        <Text style={styles.description}>
          Para começar você precisa se cadastar como professor na nossa
          plataform web.
        </Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={handleNavigationToBack}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
