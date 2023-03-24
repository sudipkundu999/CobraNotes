import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import Notes from "./Notes";
import { api, type RouterOutputs } from "@/utils/api";

type Topic = RouterOutputs["topic"]["getAll"][0];

interface TopicsProps {
  topics: Topic[];
  refetchTopics: Function;
  noteTopicId: string;
  setNoteTopicId: React.Dispatch<React.SetStateAction<string>>;
}

export const Topics: React.FC<TopicsProps> = ({
  topics,
  refetchTopics,
  noteTopicId,
  setNoteTopicId,
}) => {
  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const DeleteTopicButton: React.FC<{ topicId: string }> = ({ topicId }) => (
    <Button
      colorScheme="red"
      variant="link"
      onClick={() => deleteTopic.mutate({ topicId: topicId })}
    >
      Delete Topic
    </Button>
  );
  return (
    <Accordion allowMultiple>
      {topics?.map((topic, i) => (
        <AccordionItem key={`${topic.title}-${i}`}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {topic.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Notes
              topicId={topic.id}
              noteTopicId={noteTopicId}
              setNoteTopicId={setNoteTopicId}
            />
            <div className="mt-2 w-full text-right">
              <DeleteTopicButton topicId={topic.id} />
            </div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
