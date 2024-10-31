import './TodoList.css';
import { useState } from 'react';

interface Todo  {
  id: number;
  text: string;
  isChecked: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState(Array<Todo>);
  const [newTodo, setNewTodo] = useState('');

  const handleCheckBoxChange = (id : number) => {
    setTodos(prevItems => prevItems.map(todo => todo.id === id ? {...todo, isChecked: !todo.isChecked} : todo));
  }

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
    setNewTodo('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">오늘 할 일</h1>
      </div>
      <div className="card-content">
        <div className="input-group">
          <input type="text" className="input-field" placeholder="할 일을 입력하세요" value={newTodo} onChange={(e) => { setNewTodo(e.target.value); }}/>
          <button type="submit" className="add-button" onClick={handleAddTodo}> 추가 </button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              <input type="checkbox" className="todo-checkbox" onChange={() => handleCheckBoxChange(todo.id)} />
              {todo.isChecked ? <span className="complete-text">{todo.text}</span> : <span className="incomplete-text">{todo.text}</span>}
              <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;