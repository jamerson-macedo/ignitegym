import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";
import defautUserPhoto from "@assets/userPhotoDefault.png";
export function HomeHeader() {
  const {user}=useAuth()
  return (
    <HStack background={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        size={16}
        source={user.avatar?{ uri:user.avatar}: defautUserPhoto}
        alt="Imagem do usuario"
        mr={4}
      />
      <VStack flex={1}>
        <Text color={"gray.100"} fontSize={"md"}>
          Olá
        </Text>
        <Heading color={"gray.100"} fontSize={"md"} fontFamily={"heading"}>
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity>
      <Icon as={MaterialIcons} name="logout" size={7} color={"gray.200"} />
      </TouchableOpacity>
     
    </HStack>
  );
}
