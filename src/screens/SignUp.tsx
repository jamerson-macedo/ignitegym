import { VStack, Image, Text, Center, Heading, ScrollView,useToast } from "native-base";
import BackGroundImg from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, set } from "react-hook-form"; // serve para pegar todos os dados dos inputs
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@services/api";
import axios from "axios";

import { Alert } from "react-native";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};
// esquema para validar
const singUpSchema = yup.object({
  name: yup.string().required("Informe o nome.").trim(),
  email: yup
    .string()
    .required("Informe o E-mail")
    .email("Email invalido.")
    .trim(),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6  digitos.")
    .trim(),
  password_confirm: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password")], "A confirmaçào da senha não confere")
    .trim(),
});
// VS STACK COLOCA UMA COISA EM CIMA DA OUTRA
// contain ajusta melhor
// absolute deixa completo pegando tudo
// margin vertical de 24 em cima e em baixo
export function SignUp() {
  const [isLoading,setIsLoading]=useState(false)
  const signIn=useAuth()
  const toast=useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(singUpSchema),
  }); // controla os dados e submit manda os dados

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }
  async function handleSingUp({ name, email, password }: FormDataProps) {
    	try {
        setIsLoading(true)
        await api.post('/users',{name,email,password});
        await signIn.singIn(email,password)

      } catch (error) {
        setIsLoading(false)
      const isAppError=error instanceof AppError
      const title=isAppError? error.message : "Nao foi possivel criar conta, tente novamente mais tarde"
     toast.show({title,placement:'top',bgColor:"red.500"})
   
    }
  }
    //1 parametro é onde esta o backend
    // como estou usando o endereco do pc tem que ser assim
    /*
    fetch("http://192.168.18.4:3333/users", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({name, email, password})
    }).then(response =>response.json())
      .then(data=>console.log(data));
      */
     
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={8}>
        <Image
          source={BackGroundImg}
          defaultSource={BackGroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position={"absolute"}
        />
        <Center my={24}>
          <LogoSVG />
          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading
            color={"gray.100"}
            fontSize={"xl"}
            mb={6}
            fontFamily={"heading"}
          >
            Crie Sua conta
          </Heading>

          <Controller
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
            control={control}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSingUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e Acessar"
            onPress={handleSubmit(handleSingUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          mt={12}
          title="Voltar para Login"
          variant={"outline"}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
