import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackGroundImg from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form"; // serve para pegar todos os dados dos inputs


type FormDataProps={
  name:string;
  email:string;
  password:string;
  password_confirm:string;

}
// VS STACK COLOCA UMA COISA EM CIMA DA OUTRA
// contain ajusta melhor
// absolute deixa completo pegando tudo
// margin vertical de 24 em cima e em baixo
export function SignUp() {

  const { control,handleSubmit,formState:{errors} } = useForm<FormDataProps>(); // controla os dados e submit manda os dados
  

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }
  function handleSingUp(data: FormDataProps) {
    console.log(data.email)

  }
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
            rules={{
              required:"insira um nome"
      
            }}
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Nome" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
            )}
            control={control}
          />
          

          <Controller
            name="email"
            control={control}
            rules={{required:"Informe o E-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Insira um E-mail válido"
              }
            }}
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
              />
            )}
          />

          <Button title="Criar e Acessar" onPress={handleSubmit(handleSingUp)} /> 
        </Center>

        <Button
          mt={24}
          title="Voltar para Login"
          variant={"outline"}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
