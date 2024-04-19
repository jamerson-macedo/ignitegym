import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, VStack,SectionList, Text, Center } from "native-base";
import { useState } from "react";

export function History() {
    // estruturea da sextion list
  const [exercises, setExercises] = useState([
    {
      title: "24.2.2024",
      data: ["puxada lateral", "puxada frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercicio" />
      <SectionList sections={exercises} 
      contentContainerStyle={exercises.length===0&&{flex:1, justifyContent:"center"}}
      ListEmptyComponent={()=>(
        <Text color={"gray.100"} textAlign={"center"}>Nào há exercicios registrados ainda.{'\n'}
            vamos fazer exercicios hoje?
        </Text>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={item=>item}
      renderItem={({item})=>(<HistoryCard />)}
      renderSectionHeader={({section})=>(
        <Heading fontFamily={"heading"} color={"gray.200"} fontSize={"md"} mt={10} mb={3}>{section.title}</Heading>

      )}
      px={8}
      />
      
    </VStack>
  );
}
