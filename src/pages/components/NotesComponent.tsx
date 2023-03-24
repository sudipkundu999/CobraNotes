import React from "react";
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

  return (
    <div className="mt-10 w-full px-1">
      <Topics topics={topics as Topic[]} refetchTopics={refetchTopics} />
      <AddTopic refetchTopics={refetchTopics} />
      <AddNote topics={topics as Topic[]} />
    </div>
  );
};

export default NotesComponent;
