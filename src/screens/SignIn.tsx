import { VStack,Image } from "native-base";
import BackGroundImg from '@assets/background.png';


// VS STACK COLOCA UMA COISA EM CIMA DA OUTRA
// contain ajusta melhor
// absolute deixa completo pegando tudo
export function SignIn(){
    return (
        
        <VStack flex={1} bg={"gray.700"}>
            <Image source={BackGroundImg} alt="Pessoas treinando" resizeMode="contain" position={"absolute"}/>
            
        </VStack>

    );


    
}