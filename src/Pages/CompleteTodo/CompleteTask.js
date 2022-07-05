import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import TodoCard from '../Todo/TodoCard';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import task from '../../assets/images/task.png'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import '../Todo/TodoCard'

const CompleteTask = () => {
    const [user,] = useAuthState(auth);
    const [date, setDate] = useState(new Date)
    console.log(date)
    const formateDate = format(date, 'PP')
    const {data: todo, isLoading, refetch} = useQuery('todo', () => fetch(`https://arcane-wave-11590.herokuapp.com/todo/${user?.email}`, {
        method: 'GET',

    }).then(res => res.json()));

    const dateTask = todo?.filter(i => i?.date?.includes(formateDate));
    const todos = dateTask?.filter(i => i?.status?.includes('complete')); 

    if(isLoading){
        <Loading />
    }
    return (
        <div className='px-2 md:px-8 min-h-screen lg:px-16 ox-hidden pt-24'>
            <h1 className='text-2xl md:text-5xl text-center uppercase text-blue-600 font-bold'>Complete Task</h1>
            <div className="w-full mx-auto p-2 mt-5">
                <div className="md:flex mt-5 w-full justify-between">
                    <div className="">
                        <div className="w-[320px] sm:w-[336px] md:mr-3 mb-4 md:mb-0 todo-order p-3 mx-auto rounded-lg bg-white">
                            <div>
                                <DayPicker 
                                    mode="single"
                                    selected={date}
                                    onDayClick={setDate}
                                    defaultMonth={new Date} 
                                    fromYear={(2022)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4 md:mt-0">
                        { todos?.length !== 0 && <h1 className='text-xl font-bold text-cyan-600 mb-2'>Completed Todo Item <span className='text-cyan-800'>{todos?.length}</span></h1>}
                        <div className="grid grid-cols-1 gap-3">
                        {
                            todos && todos?.map((todoItem, index) => <TodoCard 
                                key={todoItem._id}
                                todoItem={todoItem}
                                index={index}
                                refetch={refetch}
                            />)
                        }
                        {
                            todos?.length === 0 && <div className="mx-auto mt-10 w-[200px]">
                                <img src={task} className="w-full" alt="" />
                            </div>
                        } 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteTask;