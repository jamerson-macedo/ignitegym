import { Button as NativeButton, IButtonProps, Text } from "native-base";
type Props = IButtonProps & {
  title: string;
};

export function Button({ title, variant, ...rest }: Props) {
  return (
    <NativeButton
      w={"full"}
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      rounded={"sm"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={"green.500"}
      _pressed={{ bg:variant==="outline"? "gray.500":"green.500" }}
      {...rest}
    >
      <Text color={variant==="outline"?"green.500":"white"} fontFamily={"heading"} fontSize={"sm"}>
        {title}
      </Text>
    </NativeButton>
  );
}
