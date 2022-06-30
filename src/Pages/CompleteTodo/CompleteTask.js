import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import TodoCard from '../Todo/TodoCard';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const CompleteTask = () => {
    const [user,] = useAuthState(auth);
    const {data: todo, isLoading, refetch} = useQuery('todo', () => fetch(`http://localhost:5000/todo/${user?.email}`, {
        method: 'GET',

    }).then(res => res.json()));

    const todos = todo?.filter(i => i?.status?.includes('complete')); 
    if(isLoading){
        <Loading />
    }
    refetch()
    return (
        <div className='pt-24'>
            <h1 className='text-2xl md:text-5xl text-center uppercase text-blue-600 font-bold'>Complete Task</h1>
            <div className="md:w-[700px] mx-auto p-2 mt-5">
                <h1 className='text-xl font-bold text-cyan-600 mb-2'>Completed Todo Item</h1>
                <div className="grid grid-cols-1 gap-3">
                {
                    todos && todos.map(todoItem => <TodoCard 
                        key={todoItem._id}
                        todoItem={todoItem}
                        refetch={refetch}
                    />)
                } 
                </div>
            </div>
        </div>
    );
};

export default CompleteTask;