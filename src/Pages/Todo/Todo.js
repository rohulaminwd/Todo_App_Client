import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { format } from 'date-fns';
import TodoCard from './TodoCard';
import './Todo.css'
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';
import task from '../../assets/images/task.png'
import EditeModul from '../../Modul/EditeModul';

const Todo = () => {
    const [user,] = useAuthState(auth);
    const [editeModal, setEditeModal] = useState(null)
    const [date, setDate] = useState(new Date)
    const formateDate = format(date, 'PP')
    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const {data: todo, isLoading, refetch} = useQuery('todo', () => fetch(`https://arcane-wave-11590.herokuapp.com/todo/${user?.email}`, {
        method: 'GET',

    }).then(res => res.json()));

    const todos = todo?.filter(i => i?.status?.includes('pending')); 

    if(isLoading ){
        <Loading />
    }

    const onSubmit = data => {
        const task = data.task;
        const dates = formateDate;
        const email = user?.email;
        const status = "pending"
        
        const todoTask = {
            task: task,
            date: dates,
            email: email,
            status: status,
        }

        console.log(todoTask)

        fetch('https://arcane-wave-11590.herokuapp.com/todo', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(todoTask)
        })
        .then(res => res.json())
        .then(inserted => {
            if(inserted.insertedId){
                reset()
                toast.success('Todo Items add successfully');
            }else{
                toast.error('fail to add Todo Items')
            }
        })
    }
    refetch()
    return (
        <div className="max-w-7xl pt-20 min-h-screen mx-auto bg-blue-100">
            <div className="md:w-[700px] p-4 mx-auto">
                <h1 className='text-4xl uppercase text-cyan-800 font-bold text-center'>Todo Task list</h1>
                <div className="bg-white rounded-lg my-5 mx-auto md:w-[600px] p-3">
                    <h1 className='text-xl font-bold text-cyan-600 mb-2'>Add Todo Item</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-between">
                        <div className="w-full">
                            <input 
                                type="text" 
                                placeholder="Add Todo Task" 
                                class="input w-full input-bordered input-success" 
                                {...register("task", {
                                    required: {
                                      value: true,
                                      message: 'Task is required'  
                                    },
                                  })}
                            />
                            <label className="label">
                                {errors.task?.type === 'required' && <span className="label-text-alt text-red-500">{errors.task.message}</span>}
                            </label>
                        </div>
                        <input className='btn ml-2 btn-success font-bold' type="submit" value="Add" />
                    </form>
                </div>
                {todos?.length !== 0 && <h1 className='text-xl font-bold text-cyan-600 mb-2'>All Todo Item <span className='text-cyan-800'>{todos?.length}</span></h1>}
                <div className="grid grid-cols-1 gap-3">
                   {
                    todos && todos?.map(todoItem => <TodoCard 
                        key={todoItem._id}
                        todoItem={todoItem}
                        refetch={refetch}
                        setEditeModal={setEditeModal}
                    />)
                   } 
                   {
                    todos?.length === 0 && <div className="mx-auto mt-10 w-[300px]">
                        <img src={task} className="w-full" alt="" />
                    </div>
                   }
                </div>
            </div>
            {
                editeModal && <EditeModul 
                editeModal={editeModal} 
                refetch={refetch} 
                setEditeModal={setEditeModal}
                />
            }
        </div>
    );
};

export default Todo;