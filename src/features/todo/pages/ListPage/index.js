import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import {
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
import { Button } from '../../components/TodoList/styles';

function ListPage(props) {
  const initTodoList = [
    { id: 1, title: 'code React', status: 'new' },
    {
      id: 2,
      title: 'play video game',
      status: 'completed',
    },
    { id: 3, title: 'working out', status: 'new' },
    { id: 4, title: 'running outside', status: 'new' },
  ];
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  // console.log(location);
  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredStatus, setFilteredStatus] = useState(
    () => {
      const params = queryString.parse(location.search);
      console.log(params);
      return params.status || 'all';
    }
  );
  //   console.log(todoList);

  useEffect(() => {
    const params = queryString.parse(location.search);
    console.log(params);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    // console.log(todo, idx);
    const newTodoList = [...todoList];
    newTodoList[idx] = {
      ...newTodoList[idx],
      status:
        newTodoList[idx].status === 'new'
          ? 'completed'
          : 'new',
    };

    setTodoList(newTodoList);
  };

  const handleShowAll = () => {
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNew = () => {
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompleted = () => {
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderFilteredTodoList = useMemo(() => {
    return todoList.filter(
      (todo) =>
        filteredStatus === 'all' ||
        filteredStatus === todo.status
    );
  }, [todoList, filteredStatus]);
  //   console.log(renderFilteredTodoList);

  const handleTodoFormSubmit = (values) => {
    console.log('form submit:', values);
    const newTodos = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodos];
    setTodoList(newTodoList);
  };

  return (
    <div>
      <center>
        <h3>What to do?</h3>
        <TodoForm onSubmit={handleTodoFormSubmit} />
        <TodoList
          todoList={renderFilteredTodoList}
          onTodoClick={handleTodoClick}
        />
        <Button onClick={handleShowAll}>Show all</Button>
        <Button onClick={handleShowNew}>Show new</Button>
        <Button onClick={handleShowCompleted}>
          Show completed
        </Button>
      </center>
    </div>
  );
}

export default ListPage;
