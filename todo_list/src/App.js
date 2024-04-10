import React, {useState, useEffect} from "react";
import "./App.css";
import { ThemeContext } from './theme-context'; // Importa el contexto del tema desde otro archivo

const App = () => {
  const [todos, setTodos] = useState([]); // Estado para almacenar la lista de tareas
  const [todoEditing, setTodoEditing] = useState(null); // Estado para el ID de la tarea que se está editando
  const { theme, toggle, dark } = React.useContext(ThemeContext); // Obtiene el tema actual y la función de cambio de tema del contexto utilizando el hook useContext


  useEffect(() => {
    const json = localStorage.getItem("todos"); // Obtiene las tareas del almacenamiento local
    const loadedTodos = JSON.parse(json); // Convierte las tareas de formato JSON a un array de objetos
    if (loadedTodos) {
      setTodos(loadedTodos); // Establece las tareas cargadas en el estado local
    }
  }, []); // El array vacío como segundo argumento significa que este efecto solo se ejecuta una vez, al montar el componente


  useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos); // Convierte las tareas a formato JSON
        localStorage.setItem("todos", json); // Guarda las tareas en el almacenamiento local
    }
  }, [todos]); // Se ejecuta cada vez que el estado de 'todos' cambia

  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
    } else {
        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }
  
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  
  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <header className="App-header">
        <button
          type="button"
          onClick={toggle}
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            outline: 'none'
          }}
        >
          Toggle to {!dark ? 'Dark' : 'Light'} theme
        </button>
      </header>
      <div id="todo-list">
        <h1>ToDo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id='todoAdd'
          />
          <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {todo.id === todoEditing ?
                (<input
                  type="text"
                  id={todo.id}
                  defaultValue={todo.text}
                />) :
                (<div>{todo.text}</div>)
              }
            </div>
            <div className="todo-actions">
              {todo.id === todoEditing ?
                (<button onClick={() => submitEdits(todo)}>Submit Edits</button>) :
                (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
              }
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
