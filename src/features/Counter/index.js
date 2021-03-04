import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

function CounterFeature() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    const actions = increase();
    dispatch(actions);
  };

  const handleDecrease = () => {
    const actions = decrease();
    dispatch(actions);
  };
  return (
    <div>
      <h3>Counter:{counter}</h3>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
    </div>
  );
}

export default CounterFeature;
