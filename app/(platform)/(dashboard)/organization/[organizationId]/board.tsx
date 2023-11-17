import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import React from "react";

interface BoardProps {
  title: string;
  id: string;
}

const Board = ({ id, title }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form className="flex items-center gap-x-2" action={deleteBoardWithId}>
      <p>Board title: {title}</p>
      <Button type="submit" variant={"destructive"} size={"sm"}>
        Delete
      </Button>
    </form>
  );
};

export default Board;
