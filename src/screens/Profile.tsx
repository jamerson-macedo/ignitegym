import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';


export function Profile() {
  const PHOTO_SIZE = 33;
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https:github.com/jamerson-macedo.png"
  );
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if(photoSelected.canceled){
        return;
      }
    
      
      if( photoSelected.assets[0].uri){
        setUserPhoto(photoSelected.assets[0].uri)
      
      }
     
     
    } catch (error) {
      console.log(error);
    }finally{
      setPhotoIsLoading(false)
    }

    
  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center px={10} mt={6}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor={"gray.500"}
              endColor={"gray.400"}
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              alt="foto do usuario"
              source={{ uri: userPhoto }}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color={"green.500"}
              fontWeight={"bold"}
              fontSize={"md"}
              mb={8}
              mt={2}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input placeholder="Nome" bg={"gray.600"} />
          <Input placeholder="Email" bg={"gray.600"} isDisabled />
        </Center>
        <Center px={10} mt={12} mb={9}>
          <Heading
            color={"gray.200"}
            fontSize={"md"}
            mb={2}
            fontFamily={"heading"}
            alignSelf={"flex-start"}
          >
            Alterar senha
          </Heading>
          <Input placeholder="Senha antiga" bg={"gray.600"} secureTextEntry />
          <Input placeholder="Nova senha" bg={"gray.600"} secureTextEntry />
          <Input
            placeholder="Confirme nova senha"
            bg={"gray.600"}
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
