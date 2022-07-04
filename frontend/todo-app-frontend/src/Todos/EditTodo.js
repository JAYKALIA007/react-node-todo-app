import {useState} from 'react'
import axios from 'axios'
export default function EditTodo( {todo , callbackFromParent} ){
    console.log(todo)
    const [myTodo , setMyTodo] = useState(todo)
    function handleTodoChange(e){
        setMyTodo({...myTodo , 
            [e.target.name] : e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        sendEditRequestToServer(myTodo)
    }
    async function sendEditRequestToServer(myTodo){
        const id = myTodo._id
        try {
            const res = await axios.put(`http://localhost:4000/todo/${id}`, { todo: myTodo.todo })
            console.log(res.data)
            callbackFromParent()
        } catch (err) {
            console.log(err)
        }
    }
    return(
        <>
            <button type="button" className="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input type="text" name="todo" value={myTodo.todo} onChange={handleTodoChange}  />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit} >Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}