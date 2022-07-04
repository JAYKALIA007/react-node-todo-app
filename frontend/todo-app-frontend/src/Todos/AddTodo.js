import {useState} from 'react'
import axios from 'axios'
export default function AddTodo( { callback } ){
    const [ myTodo,setMyTodo ] = useState({
        todo:""
    })
    function handleTodoChange(e){
        setMyTodo({...myTodo , 
            [e.target.name] : e.target.value
        })
    }
    function handleTodoSubmit(e){
        e.preventDefault();
        // console.log(myTodo)
        sendDataToServer(myTodo)
        setMyTodo({
            todo : ""
        })
    }
    function sendDataToServer(myTodo){
        return axios.post(`http://localhost:4000/add-todo`,myTodo)
        .then(res=>{
            console.log(res)
            callback()
        })
        .catch(err=>{console.log(err)})
    }

    return(
        <div>
            <form onSubmit={handleTodoSubmit} >
                Add Todo here
                <input type="text" name="todo" value={myTodo.todo} placeholder="edit here" onChange={handleTodoChange} />
            </form>
        </div>
    )
}