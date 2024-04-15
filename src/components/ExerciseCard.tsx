import { HStack, Heading, Image, VStack, Text,Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {Entypo} from "@expo/vector-icons"

type Props = TouchableOpacityProps & {};
export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg={"gray.500"} alignItems={"center"}p={2} rounded={"md"} pr={4} mb={3}>
        <Image
          source={{
            uri: "https://blog.totalpass.com.br/wp-content/uploads/2022/04/exercicios-fisicos.jpg",
          }}
          alt="Imagem do exercicio"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="center"
        />
        <VStack flex={1}>
          <Heading fontSize={"lg"} color={"white"}>Remada unilateral</Heading>
          <Text numberOfLines={2} mt={1} color={"gray.200"} fontSize={"sm"}>3 Series x 12 repetições</Text>
        </VStack>
      
        <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"}/>
      </HStack>
    </TouchableOpacity>
  );
}
