import {useCallback, useState, useEffect} from 'react';
import './App.css';

// function App(props) {
//   const [name, setName] = useState('NAME');
//   const onNameChange = useCallback((event) => {
//     setName(event.target.value)
//   },[])
//   return (
//     <div className="App">
//         <h1>Hello {name}!</h1>
//       <form>
//         <label>Enter it bitch: </label>
//         <input
//           value={name}
//           onChange={onNameChange}
//         />
//       </form>
//     </div>
//   );
// }

function App() {
  const [newTodo,setNewTodo] = useState('');

  const [todos, setTodos] = useState([])
  
  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value)
  },[])

  //
  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    
    if (!newTodo.trim())return;
    console.log("Form submitted")
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        content: newTodo.trim(),
        done: false
      }
    ])

    setNewTodo('')
  },[todos,newTodo])

  const onTodoChecked = useCallback((todo,index) => (event) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1,{
      ...todo,
        done: !todo.done
    })
    setTodos(newTodos)
    
  },[todos])

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo != todo))
  },[todos])


  useEffect(() => {
    console.log('todos', todos);
  },[todos])

  return (
    <div className="App">
      <form onSubmit={formSubmitted}>
        <h1 htmlFor="newTodo">Enter a todo</h1> 
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange}
          className='input-search'
        />
        <button>Add Todo</button>
        <ul>
          {todos.map((todo, index) =>(
            <li key={todo.id} className={todo.done ? 'doneLI' : ''}  >
              {/* <input 
                checked = {todo.done}
                type="checkbox" 
                onChange={onTodoChecked(todo,index)}
              /> */}
              <button onClick={onTodoChecked(todo,index)}>Check</button>
              <span className={todo.done ? 'done' : ''} >
                {todo.content}
              </span>
              <button onClick={removeTodo(todo)}>Remove Todo</button>
            </li>
          ))}  
        </ul>
      </form>

    </div>
  );
}


export default App;