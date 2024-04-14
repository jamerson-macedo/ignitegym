import { Input as NativeBaseInput, IInputProps } from "native-base";
// h é a altura da caixa
// px é o padding interno para não ficar colado
// border width é a grossura da borda
///passando as propiedade para a outra tela
export function Input({...rest}:IInputProps) {
return (
    <NativeBaseInput 
    bg={"gray.700"}
    h={14}
    px={4}
    borderWidth={0}
    fontSize={"md"}
    color={"white"}
    fontFamily={"body"}
    mb={4}
    _focus={{
        bg:"gray.700",
        borderWidth:"1px",
        borderColor:"green.500",

    }}
    placeholderTextColor={"gray.300"}
    {...rest}
    
    />


);


}