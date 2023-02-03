
import React,{ useState ,useRef, useEffect} from 'react';
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid';




const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App(){
  // const[todos, setTodos] = useState([])
  const todoNameRef = useRef()


 useEffect(()=>{
 const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos) setTodos(storedTodos)
  },[])
// const [todos,setTodos]= localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify(todos)))
const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
 



 function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
 }


 function handleClearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
 }


  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name ==='') return
      // console.log(name)
      setTodos(prevTodos=>{
        return [...prevTodos,{id:uuidv4(), name:name, complete:false}]

      })
      todoNameRef.current.value = null
    

  }
  return(
    <>
        <TodoList todos={todos} toggleTodo = {toggleTodo}/>
        <input ref={todoNameRef} type ="text" />
        <button onClick={handleAddTodo }>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Todo</button>
        <button>{todos.filter(todo => !todo.complete).length}0 left toDo</button>
    </>
  )
}
export default App;