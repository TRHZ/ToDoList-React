- [1. Documentación de la Aplicación To-Do List en React](#1-documentación-de-la-aplicación-to-do-list-en-react)
  - [1.1. Estados y Funciones](#11-estados-y-funciones)
  - [1.2. Agregar Nueva Tarea](#12-agregar-nueva-tarea)
  - [1.3. Eliminar Tarea](#13-eliminar-tarea)
  - [1.4. Marcar como Completada](#14-marcar-como-completada)
  - [1.5. Editar Tarea](#15-editar-tarea)
  - [1.6. Almacenamiento Local](#16-almacenamiento-local)
- [Conclusiones](#conclusiones)

# 1. Documentación de la Aplicación To-Do List en React
## 1.1. Estados y Funciones
En el archivo `App.js`, tenemos los siguientes estados y funciones:

- **Estado `todos`:** Este estado mantiene la lista de todos.
- **Función `setTodos`:** Esta función se utiliza para establecer el valor del estado `todos`.
  
```javascript
const [todos, setTodos] = useState([]);
```

## 1.2. Agregar Nueva Tarea

Para agregar una nueva tarea a la lista de tareas pendientes, se agrega la función `handleSubmit`. Esta función agrega la nueva tarea a la lista y realiza validaciones necesarias.

```javascript
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
    document.getElementById('todoAdd').value = ""}
```

## 1.3. Eliminar Tarea

La eliminación de tareas funciona mediante la función `deleteTodo`, que filtra la tarea a eliminar basada en su ID y actualiza la lista de tareas.

```javascript
function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
```

## 1.4. Marcar como Completada

La función `toggleComplete` permite marcar una tarea como completada. Utiliza el método `map` para actualizar el estado de la tarea correspondiente.

```javascript
function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
```

## 1.5. Editar Tarea

La función `submitEdits` permite editar una tarea en la lista de tareas pendientes. Actualiza el texto de la tarea y finaliza el modo de edición.

```javascript
function submitEdits(newtodo) {
const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);}
```

## 1.6. Almacenamiento Local

Utilizamos el hook `useEffect` para almacenar y cargar las tareas desde el almacenamiento local. Las tareas se guardan como JSON en el almacenamiento local.

```javascript
useEffect(() => {
  const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
}, []);

useEffect(() => {
  if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
}, [todos]);
```
# Conclusiones
En esta practica  se ha aprendido a trabajar con el estado en React, manejar eventos y realizar operaciones de array como agregar, al igual de como se puede guardar los datos en lo que es el JSON, la practica fue algo corta en cuanto los contenidos, pero para realizado solo es de entender que hace cada componente y donde van, lo mas complicado se puede decir que fue el ubicar bien donde va cada seccion, el código proporciona una interfaz para agregar, editar, completar y eliminar tareas en una lista de tareas. Además, utiliza el almacenamiento local del navegador para persistir las tareas incluso después de recargar la página.