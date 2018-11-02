import React, { useState, useEffect } from 'react';
import Form from './Form';

export default () => {
  const [todos, setTodos] = useState([]);
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await fetch('https://api.randomuser.me/');
    const data = await response.json();
    const [item] = data.results;
    setPerson(item);
    setLoading(false);
  }, []);

  const toggleComplete = i =>
    setTodos(
      todos.map(
        (todo, k) =>
          k === i
            ? {
                ...todo,
                complete: !todo.complete,
              }
            : todo,
      ),
    );

  return (
    <div>
      <Form
        onSubmit={text => setTodos([{ text, complete: false }, ...todos])}
      />
      <div>
        {todos.map(({ text, complete }, i) => (
          <div
            key={text}
            onClick={() => toggleComplete(i)}
            style={{
              textDecoration: complete ? 'line-through' : '',
            }}
          >
            {text}
          </div>
        ))}
        {loading ? (
          <div>Loading...</div>
        ) : (
          person && <div>{person.name.first}</div>
        )}
      </div>
    </div>
  );
};
