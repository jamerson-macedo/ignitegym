import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Heading, VStack,SectionList, Text, Center, useToast } from "native-base";
import { useCallback, useState } from "react";


export function History() {
    // estruturea da sextion list
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const toast=useToast()
  const [isLoading,setIsLoading]=useState(true)

  async function fetchHistory(){
    try {
      setIsLoading(true)
      const response= await api.get('/history')
      setExercises(response.data)
      console.log(response.data[0])
      
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError? error.message : "não foi possivel carregar o Historico";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false)
     
    }
  }
  useFocusEffect(useCallback(()=>{
    fetchHistory();
  },[]))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercicio" />
      { isLoading? <Loading/>:
        <SectionList sections={exercises} 
      contentContainerStyle={exercises.length===0&&{flex:1, justifyContent:"center"}}
      ListEmptyComponent={()=>(
        <Text color={"gray.100"} textAlign={"center"}>Nào há exercicios registrados ainda.{'\n'}
            vamos fazer exercicios hoje?
        </Text>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={item=>item.id}
      renderItem={({item})=>(<HistoryCard  data={item}/>)}
      renderSectionHeader={({section})=>(
        <Heading fontFamily={"heading"} color={"gray.200"} fontSize={"md"} mt={10} mb={3}>{section.title}</Heading>

      )}
      px={8}
      />}
      
    </VStack>
  );
}
