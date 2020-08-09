import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";
import landingImg from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";
import api from "../../services/api";

function Landing() {
  const navigation = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  useFocusEffect(() => {
    api.get("connections").then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  });

  function handleNavigateToGiveClassesPage() {
    navigation.navigate("GiveClasses");
  }

  function handleNaviteToStudyPage() {
    navigation.navigate("Study");
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg}></Image>
      <Text style={styles.title}>
        Seja bem vindo,{"\n"}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNaviteToStudyPage}
        >
          <Image source={studyIcon}></Image>
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={giveClassesIcon}></Image>
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de conexões {totalConnections} já realizadas.{" "}
      </Text>
      <Image source={heartIcon}></Image>
    </View>
  );
}

export default Landing;
