import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import PageHeader from "../components/PageHeader";

import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import TeacherItem from "../components/TeacherItem";
//import { useFocusEffect } from "@react-navigation/native";

interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}
interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

function Favorites() {
  const [favorites, setFavorites] = useState<[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }
  useEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited
            ></TeacherItem>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;