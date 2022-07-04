import axios from 'axios'
export default function DeleteTodo({id , callbackFromParent}){

    async function handleDeleteTodo(){
        try {
            const res = await axios.delete(`http://localhost:4000/todo/${id}`, { data: { id: id } });
            console.log(res);
            callbackFromParent()
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <>
            <button className="btn btn-primary btn-sm m-1"  onClick={(event)=>{handleDeleteTodo()}} >Delete</button>
        </>
    )
}