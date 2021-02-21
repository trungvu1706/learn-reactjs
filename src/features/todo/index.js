import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { Button } from "./components/TodoList/styles";

function TodoFeature(props) {
  const initTodoList = [
    { id: 1, title: "code React", status: "new" },
    { id: 2, title: "play video game", status: "completed" },
    { id: 3, title: "working out", status: "new" },
    { id: 4, title: "running outside", status: "new" },
  ];

  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredStatus, setFilteredStatus] = useState("all");
  //   console.log(todoList);

  const handleTodoClick = (todo, idx) => {
    // console.log(todo, idx);
    const newTodoList = [...todoList];
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };

    setTodoList(newTodoList);
  };

  const handleShowAll = () => {
    setFilteredStatus("all");
  };

  const handleShowNew = () => {
    setFilteredStatus("new");
  };

  const handleShowCompleted = () => {
    setFilteredStatus("completed");
  };

  const renderFilteredTodoList = todoList.filter(
    (todo) => filteredStatus === "all" || filteredStatus === todo.status
  );
  //   console.log(renderFilteredTodoList);

  return (
    <div>
      <center>
        <TodoList
          todoList={renderFilteredTodoList}
          onTodoClick={handleTodoClick}
        />
        <Button onClick={handleShowAll}>Show all</Button>
        <Button onClick={handleShowNew}>Show new</Button>
        <Button onClick={handleShowCompleted}>Show completed</Button>
      </center>
    </div>
  );
}

export default TodoFeature;
