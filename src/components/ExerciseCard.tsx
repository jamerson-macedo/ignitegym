import { HStack, Heading, Image, VStack, Text,Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {Entypo} from "@expo/vector-icons"
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type Props = TouchableOpacityProps & {
  data:ExerciseDTO;
};
export function ExerciseCard({data, ...rest }: Props) {
  //console.log(`${api.defaults.baseURL}/exercise/thumb/${data.thumb}`)//http://192.168.18.4:3333/exercise/thumb/rosca_punho.png
  return (
    <TouchableOpacity {...rest}>
      <HStack bg={"gray.500"} alignItems={"center"}p={2} rounded={"md"} pr={4} mb={3}>
        <Image
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
          alt="Imagem do exercicio"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize={"lg"} color={"white"} fontFamily={"heading"}>{data.name}</Heading>
          <Text numberOfLines={2} mt={1} color={"gray.200"} fontSize={"sm"}>{data.series} Series x {data.repetitions} repetições</Text>
        </VStack>
      
        <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"}/>
      </HStack>
    </TouchableOpacity>
  );
}
