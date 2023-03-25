import React, { useState } from "react";
import { api, type RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import AddTopic from "./AddTopic";
import AddNote from "./AddNote";
import Topics from "./Topics";

type Topic = RouterOutputs["topic"]["getAll"][0];

const NotesComponent = () => {
  const { data: sessionData, status } = useSession();
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  const [noteTopicId, setNoteTopicId] = useState("");

  const isTopicsEmpty: boolean = topics?.length === 0;

  return (
    <div className="mt-10 w-full px-1">
      <div className="mb-2 w-full text-center text-xl">
        {!isTopicsEmpty
          ? "List of Topics"
          : "Please add a new Topic to add new Note"}
      </div>
      <Topics
        topics={topics as Topic[]}
        refetchTopics={refetchTopics}
        noteTopicId={noteTopicId}
        setNoteTopicId={setNoteTopicId}
      />
      <AddTopic refetchTopics={refetchTopics} />
      {!isTopicsEmpty && (
        <AddNote topics={topics as Topic[]} setNoteTopicId={setNoteTopicId} />
      )}
    </div>
  );
};

export default NotesComponent;
