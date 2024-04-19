import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};
// h é a altura da caixa
// px é o padding interno para não ficar colado
// border width é a grossura da borda
///passando as propiedade para a outra tela
export function Input({ isInvalid, errorMessage = null, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid; // torna boleano
  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg={"gray.700"}
        h={14}
        px={4}
        borderWidth={0}
        fontSize={"md"}
        color={"white"}
        fontFamily={"body"}
        isInvalid={invalid}
        _invalid={{ borderWidth: 1, borderColor: "red.500" }}
        _focus={{
          bg: "gray.700",
          borderWidth: "1px",
          borderColor: "green.500",
        }}
        placeholderTextColor={"gray.300"}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{color:"red.500"}}>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
