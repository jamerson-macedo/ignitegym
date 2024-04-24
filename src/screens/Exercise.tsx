import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
// flashstink ajuda a nao empurrar caso o texto do heading for grande

// definindo o vvalor que vem da tela anterior
type RouteParams = {
  exerciseId: string;
};
export function Exercise() {
  const [sendingRegister, setSendingRegister]=useState(false)
  const [isLoading, setIsLoading] = useState(true); // se nao colocar um estado as imagen snao aparecem
  const navigation = useNavigation<AppNavigationProps>();
  const route = useRoute();
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const toast = useToast();
  const { exerciseId } = route.params as RouteParams; // recebendo da outra telka
  console.log(exerciseId);
  function handleGoBack() {
    navigation.goBack();
  }

  async function handleExerciseHistoryRegister(){
    try {
      setSendingRegister(true)
      await api.post("/history",{exercise_id:exerciseId});
      toast.show({
        title:"Parabens! Exercicio registrado no seu historico",
        placement: "top",
        bgColor: "green.700",
      });
      navigation.navigate("History")
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError? error.message : "não foi possivel registrar o exercicio";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false)
      
    }
  }
  async function fetchExerciseDetail() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppErrpr = error instanceof AppError;
      const title = isAppErrpr
        ? error.message
        : "não foi possivel carregar os detalhes do exercicio";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchExerciseDetail();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg={"gray.600"} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color={"green.500"} size={6} />
        </TouchableOpacity>
        <HStack
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          mb={8}
        >
          <Heading
            color={"gray.100"}
            fontSize={"lg"}
            flexShrink={1}
            fontFamily={"heading"}
          >
            {exercise.name}
          </Heading>
          <HStack alignItems={"center"}>
            <BodySvg />
            <Text color={"gray.200"} textTransform={"capitalize"} ml={1}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p={8}>
            <Box rounded={"lg"} mb={3} overflow={"hidden"}>
              <Image
                rounded={"lg"}
                resizeMode="cover"
                w={"full"}
                h={80}
                alt="Nome do exercicio"
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
              />
            </Box>
            <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
              <HStack
                alignItems={"center"}
                justifyContent={"space-around"}
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSvg />
                  <Text color={"gray.200"} textTransform={"capitalize"} ml={2}>
                    {exercise.series} series
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color={"gray.200"} textTransform={"capitalize"} ml={2}>
                    {exercise.repetitions} Repetições
                  </Text>
                </HStack>
              </HStack>
              <Button title="Marcar como Revisado" isLoading={sendingRegister} onPress={handleExerciseHistoryRegister} />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
}
