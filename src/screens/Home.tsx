import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { VStack, FlatList, HStack, Heading, Text,useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("antebraço");
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true)


  const toast=useToast()
  const navigation=useNavigation<AppNavigationProps>();

  function handleOpenExerciseDetails(exerciseId:string){
    navigation.navigate("Exercise",{exerciseId});
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
  async function fetchExercisesByGroup(){
    try {
      setIsLoading(true);
      const response= await api.get(`/exercises/bygroup/${groupSelected}`)
     setExercises(response.data) // inserindo grupos
      
    } catch (error) {
      const isAppErrpr=error instanceof AppError;
      const title=isAppErrpr?error.message:"não foi possivel carregar os Exercicios"
      toast.show({
        title,
       placement:"top",
       bgColor: "red.500"
      
      })
      
    }finally{
      setIsLoading(false);
    }

  } // carrega sempre uma vez
  useEffect(() =>{
    fetchGroups();
    
  },[])

  useFocusEffect(useCallback(()=>{
    fetchExercisesByGroup();
  },[groupSelected]))
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
      {isLoading? <Loading/> :
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (<ExerciseCard onPress={()=>handleOpenExerciseDetails(item.id)} data={item}/>)}
        >

        </FlatList>

      </VStack>
      }
    </VStack>
  );
}
