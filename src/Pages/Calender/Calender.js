import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import TodoCard from '../Todo/TodoCard';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import EditeModul from '../../Modul/EditeModul';
import task from '../../assets/images/task.png'

const Calender = () => {
    const [user,] = useAuthState(auth);
    const [editeModal, setEditeModal] = useState(null)
    const [date, setDate] = useState(new Date)
    const formateDate = format(date, 'PP')

    const {data: todo, isLoading, refetch} = useQuery('todo', () => fetch(`hhttps://arcane-wave-11590.herokuapp.com/todo/${user?.email}`, {
        method: 'GET',

    }).then(res => res.json()));
    const todos = todo?.filter(i => i?.date?.includes(formateDate)); 
    const todoDate = todos?.filter(i => i?.status?.includes('pending')); 


    if(isLoading){
        <Loading />
    }

    return (
        <div className='px-2 md:px-8 min-h-screen lg:px-16 ox-hidden pt-24'>
            <h1 className='text-2xl md:text-5xl text-center uppercase text-blue-600 font-bold'>Calender</h1>
            <div className="md:flex mt-5 w-full justify-between">
                <div className="">
                    <div className="w-[320px] sm:w-[336px] md:mr-3 mb-4 md:mb-0 p-3 mx-auto md:order rounded-lg bg-white">
                        <div>
                            <DayPicker 
                                mode="single"
                                selected={date}
                                onDayClick={setDate}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full mt-4 md:mt-4">
                    { todoDate?.length !== 0 &&<h1 className='text-xl font-bold text-cyan-600 mb-2'>Todo Items for <span className='text-cyan-800'>{formateDate}</span></h1>}
                    {todoDate?.length === 0 && <h1 className='text-xl font-bold text-cyan-600 mb-2'>Not Available Todo Items for <span className='text-cyan-800'>{formateDate}</span></h1>}
                    <div className="grid w-full grid-cols-1 gap-3">
                    {
                    todoDate && todoDate?.map((todoItem, index) => <TodoCard 
                        key={todoItem._id}
                        todoItem={todoItem}
                        refetch={refetch}
                        index={index}
                        setEditeModal={setEditeModal}
                    />)
                    } 
                    {
                    todoDate?.length === 0 && <div className="mx-auto mt-10 w-[200px]">
                        <img src={task} className="w-full" alt="" />
                    </div>
                   }
                    </div>
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

export default Calender;