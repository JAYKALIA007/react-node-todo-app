import axios from 'axios'
import { useState , useEffect } from 'react'
import AddTodo from './AddTodo'
import DeleteTodo from './DeleteTodo'
import EditTodo from './EditTodo'
export default function FetchTodos(){
    const [ todos , setTodos ] = useState([])
    const [toggle , setToggle] = useState(false)
    
    function callback(){
        setToggle(!toggle)
        window.location.reload()
    }

    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await axios.get('http://localhost:4000/todos')
                return setTodos([...todos, response.data])
            } catch (err) {
                return console.log(err)
            }
        }
        fetchData()
    },[toggle] )
    

    const displayTodos = todos[0] === undefined  ? `Loading` : todos[0].map(todo=>{
        return(
            <div key={todo._id} >
                <h5>{todo.todo}</h5>
                <DeleteTodo  id={todo._id}  callbackFromParent={callback}  />
                <br/>
                <EditTodo  todo = {todo} callbackFromParent={callback} />
            </div>
        )
    })

    
    return(
        <div>
            The todos are as follows:
            {displayTodos}
            <hr/>
            <AddTodo callback={callback} />
        </div>
    )
}
