"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState<ListWithCards[]>(data);

  useEffect(() => {
    setOrderedLists(data);
  }, [data]);

  return (
    <ol className="flex gap-3 h-full">
      {orderedLists.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}
      <ListForm />
      <div className="flex shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
