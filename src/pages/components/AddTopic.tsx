import { useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { api } from "@/utils/api";

interface AddTopicProps {
  refetchTopics: Function;
}

export const AddTopic: React.FC<AddTopicProps> = ({ refetchTopics }) => {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
      setTopic("");
    },
    onError(error, variables, context) {
      setError(error.message);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTopic(value);
  };

  const onCreateClickHandler = () => {
    setError("");
    createTopic.mutate({ title: topic });
  };
  return (
    <div className="mt-10">
      <FormControl
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <FormLabel style={{ width: "100%", textAlign: "center" }}>
          New Topic
        </FormLabel>
        <Input
          placeholder="Enter new topic"
          value={topic}
          onChange={handleInputChange}
        />
        <Button
          colorScheme="blue"
          onClick={onCreateClickHandler}
          style={{ width: "100%" }}
          isDisabled={topic.match(/[a-zA-Z]/g) ? false : true}
        >
          Add Topic
        </Button>
        <div className="text-red-600">{error}</div>
      </FormControl>
    </div>
  );
};
