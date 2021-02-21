import React from "react";
import PropTypes from "prop-types";
import { List, Item, Title } from "./styles";

function TodoList(props) {
  const { todoList, onTodoClick } = props;
  const handleTodoClick = (todo, idx) => {
    if (!onTodoClick) return;

    onTodoClick(todo, idx);
  };
  return (
    <div>
      <center>
        <Title>Todo list </Title>
        <List>
          {todoList.map((todo, idx) => (
            <Item
              key={todo.id}
              completed={todo.status === "completed"}
              onClick={() => handleTodoClick(todo, idx)}
            >
              {todo.title}
            </Item>
          ))}
        </List>
      </center>
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
};

TodoList.defaultProps = {
  todoList: [],
};

export default TodoList;
