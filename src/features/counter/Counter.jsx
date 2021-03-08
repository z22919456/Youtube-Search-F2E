import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch(increment())}
          type="button"
        >
          +
        </button>
        <span>{count}</span>
        <button
          onClick={() => dispatch(decrement())}
          type="button"
        >
          -
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
          type="button"
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
          type="button"
        >
          Add Async
        </button>
      </div>
    </div>
  );
}

export default Counter;
