import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackGroundImg from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

// VS STACK COLOCA UMA COISA EM CIMA DA OUTRA
// contain ajusta melhor
// absolute deixa completo pegando tudo
// margin vertical de 24 em cima e em baixo
export function SignUp() {
  return (

    <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>

    
    <VStack flex={1} bg={"gray.700"} px={8}>
      <Image
        source={BackGroundImg}
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
        <Input
          placeholder="Nome"
      
        />
          <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />
        <Button title="Criar e Acessar" />
      </Center >

        <Button  mt={24}title="Voltar para Login" variant={"outline"} />
    
    </VStack>
    </ScrollView>
  );
}
