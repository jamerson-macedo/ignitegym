import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
// flashstink ajuda a nao empurrar caso o texto do heading for grande
export function Exercise() {
  const navigation = useNavigation<AppNavigationProps>();
  function handleGoBack() {
    navigation.goBack();
  }

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
          <Heading color={"gray.100"} fontSize={"lg"} flexShrink={1}>
            Remada unilateral
          </Heading>
          <HStack alignItems={"center"}>
            <BodySvg />
            <Text color={"gray.200"} textTransform={"capitalize"} ml={1}>
              {" "}
              costas{" "}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <VStack p={8}>
        <Image
        rounded={"lg"}
          resizeMode="cover"
          mb={3}
          w={"full"}
          h={80}
          alt="Nome do exercicio"
          source={{
            uri: "https://blog.totalpass.com.br/wp-content/uploads/2022/04/exercicios-fisicos.jpg",
          }}
        />
      </VStack>
    </VStack>
  );
}
