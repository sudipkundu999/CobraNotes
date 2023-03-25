import React, { useState } from "react";
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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Icons from "./Icons";

type Note = RouterOutputs["note"]["getAll"][0];

interface EditNoteProps {
  note: Note;
  refetchNotes: () => void;
}

const EditNote: React.FC<EditNoteProps> = ({
  note: { id, title, content },
  refetchNotes,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultFormState = { title: title, content: content };
  const [form, setForm] = useState<{ title: string; content: string }>(
    defaultFormState
  );

  const initialRef = React.useRef(null);
  const editNote = api.note.edit.useMutation({
    onSuccess: () => {
      void refetchNotes();
      onClose();
    },
  });

  const editNoteClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onOpen();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { value, id } = e.target;
    if (id === "title") {
      form.title = value;
    } else if (id === "content") {
      form.content = value;
    }
    setForm({ ...form });
  };

  const onSave = () => {
    editNote.mutate({
      title: form.title,
      content: form.content,
      noteId: id,
    });
  };

  const isFormValid =
    !form.title.match(/[a-zA-Z]/g) || !form.content.match(/[a-zA-Z]/g);

  return (
    <>
      <div className="ml-auto pr-2 text-red-500">
        <Button
          colorScheme="red"
          variant="link"
          onClick={(e) => editNoteClickHandler(e)}
          size="xs"
        >
          <Icons icon="edit" />
        </Button>
      </div>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Note name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Note title"
                value={form.title}
                onChange={handleInputChange}
                id="title"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Note content</FormLabel>
              <Textarea
                size="lg"
                onChange={handleInputChange}
                value={form.content}
                id="content"
                placeholder="Enter Content"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter style={{ display: "flex", gap: "10px" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onSave}
              isDisabled={isFormValid}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditNote;
