import axios from 'axios'
import { useEffect } from 'react'
export default function FetchTodos(){
    useEffect(()=>{
        fetchData()
    },[])
    function fetchData(){
        axios.get('http://localhost:4000/')
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div>
            The todos are as follows:
        </div>
    )
}