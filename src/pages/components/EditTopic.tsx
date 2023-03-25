import { api, type RouterOutputs } from "@/utils/api";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Icons from "./Icons";

type Topic = RouterOutputs["topic"]["getAll"][0];

interface EditTopicProps {
  topic: Topic;
  refetchTopics: () => void;
}

const EditTopic: React.FC<EditTopicProps> = ({
  topic: topicObj,
  refetchTopics,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [topic, setTopic] = useState(topicObj?.title || "");

  const initialRef = React.useRef(null);
  const editTopic = api.topic.edit.useMutation({
    onSuccess: () => {
      void refetchTopics();
      onClose();
    },
  });

  const editTopicClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onOpen();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTopic(value);
  };

  const onSave = () => {
    editTopic.mutate({
      title: topic,
      topicId: topicObj?.id,
    });
  };

  return (
    <>
      <div className="ml-auto pr-2 text-red-500">
        <Button
          colorScheme="red"
          variant="link"
          onClick={(e) => editTopicClickHandler(e)}
          size="xs"
        >
          <Icons icon="edit" />
        </Button>
      </div>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Topic name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Topic name"
                value={topic}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter style={{ display: "flex", gap: "10px" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onSave}
              isDisabled={topic.match(/[a-zA-Z]/g) ? false : true}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTopic;
