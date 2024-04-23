import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { VStack, FlatList, HStack, Heading, Text,useToast } from "native-base";
import { useEffect, useState } from "react";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("costas");
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);
  const toast=useToast()

  const navigation=useNavigation<AppNavigationProps>();

  function handleOpenExerciseDetails(){
    navigation.navigate("Exercise");
  }
  async function fetchGroups(){
    try {
     const response= await api.get("/groups")
     setGroups(response.data) // inserindo grupos do backend
      
    } catch (error) {
      const isAppErrpr=error instanceof AppError;
      const title=isAppErrpr?error.message:"não foi possivel carregar os grupos musculares"
      toast.show({
        title,
       placement:"top",
       bgColor: "red.500"
      
      })
      
    }
  }
  useEffect(() =>{
    fetchGroups();
  },[])
  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxHeight={10}
        minHeight={10}
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={String(groupSelected).toLocaleUpperCase() === String(item).toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading color={"gray.200"} fontSize={"md"} fontFamily={"heading"}>
            Exercicios
          </Heading>
          <Text color={"gray.200"} fontSize={"sm"}>
            {exercises.length}
          </Text>
        </HStack>
        <FlatList

        _contentContainerStyle={{paddingBottom:20}}// espaco pos final
        showsVerticalScrollIndicator={false}
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (<ExerciseCard onPress={handleOpenExerciseDetails}/>)}
        >

        </FlatList>

      </VStack>
    </VStack>
  );
}
