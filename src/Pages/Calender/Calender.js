import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import TodoCard from '../Todo/TodoCard';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const Calender = () => {
    const [user,] = useAuthState(auth);
    const [date, setDate] = useState(new Date)
    const formateDate = format(date, 'PP')

    const {data: todo, isLoading, refetch} = useQuery('todo', () => fetch(`http://localhost:5000/todo/${user?.email}`, {
        method: 'GET',

    }).then(res => res.json()));
    const todos = todo?.filter(i => i?.date?.includes(formateDate)); 
    const todoDate = todos?.filter(i => i?.status?.includes('pending')); 


    if(isLoading){
        <Loading />
    }

    return (
        <div className='px-2 md:px-8 lg:px-16 ox-hidden pt-24'>
            <h1 className='text-2xl md:text-5xl text-center uppercase text-blue-600 font-bold'>Calender</h1>
            <div className="md:flex mt-5 w-full justify-between">
                <div className="w-full">
                    <h1 className='text-xl font-bold text-cyan-600 mb-2'>Todo Items for <span className='text-cyan-800'>{formateDate}</span></h1>
                    <div className="grid w-full grid-cols-1 gap-3">
                    {
                    todoDate && todoDate.map(todoItem => <TodoCard 
                        key={todoItem._id}
                        todoItem={todoItem}
                        refetch={refetch}
                    />)
                    } 
                    </div>
                </div>
                <div className="w-[336px] md:ml-3 p-3 mx-auto rounded-lg bg-white">
                    <div>
                        <DayPicker 
                            mode="single"
                            selected={date}
                            onDayClick={setDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calender;