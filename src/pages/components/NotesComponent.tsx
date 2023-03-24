import React, { useState } from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { AddTopic } from "./AddTopic";
import { AddNote } from "./AddNote";
import { Topic } from "@prisma/client";
import { Topics } from "./Topics";
const NotesComponent = () => {
  const { data: sessionData, status } = useSession();
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  const [noteTopicId, setNoteTopicId] = useState("");

  return (
    <div className="mt-10 w-full px-1">
      {topics?.length && (
        <div className="mb-2 w-full text-center text-xl">List of Notes</div>
      )}
      <Topics
        topics={topics as Topic[]}
        refetchTopics={refetchTopics}
        noteTopicId={noteTopicId}
        setNoteTopicId={setNoteTopicId}
      />
      <AddTopic refetchTopics={refetchTopics} />
      <AddNote topics={topics as Topic[]} setNoteTopicId={setNoteTopicId} />
    </div>
  );
};

export default NotesComponent;
