import { useEffect, useState } from "react"

const useTodo = user => {
    const [todo, setTodo] = useState([]);
    const [todoLoading, setTodoLoading] = useState(true)
    useEffect(() => {
        const email = user?.email
        if(email){
            fetch(`http://localhost:5000/todo/${email}`, {
                method: 'Get',
            headers: {
                'content-type': 'application/json',                   
            }

            })
            .then(res => res.json())
            .then(data => {
                setTodo(data)
                console.log(data)
                setTodoLoading(false);
            })    
        }

    }, [user])
    return [todo, todoLoading]
}

export default useTodo;