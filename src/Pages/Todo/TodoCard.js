import React, { useState } from 'react';
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const TodoCard = ({todoItem, refetch, index, setEditeModal}) => {
    const [date, setDate] = useState(new Date)
    const dates = format(date, 'PP')
    
    const handleDelete = () => {
        fetch(`https://arcane-wave-11590.herokuapp.com/todo/${todoItem._id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount){
                toast.success(`${todoItem.task} deleted successfully`);
                refetch();
            }
        })
    }
    const handleComplete = () => {

        fetch(`https://arcane-wave-11590.herokuapp.com/todo/${todoItem._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({dates})
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success(`${todoItem.task} completed`);
                refetch(); 
            }
        })
    }
    return (
        <div className="bg-white rounded-lg px-3 py-2" data-aos="zoom-in-up" data-aos-delay="100" data-aos-duration="500">
            <div className="w-full">
                <div className="items-center">
                    <div className="flex items-center">
                     <h1 className='font-bold text-orange-500 mr-1'>{index + 1}</h1>
                     <h1 className='text-xl font-bold text-cyan-800'>{todoItem.title}</h1>
                    </div>
                    <div className="flex items-center">
                        { todoItem.status === "pending" && <input onClick={() => handleComplete()} type="checkbox" class="checkbox checkbox-xs mt-1 border-2 checkbox-accent" />}
                        { todoItem.status === "complete" && <input checked="checked" type="checkbox" class="checkbox mt-1 border-2 checkbox-xs checkbox-accent" />}
                        <h1 className='ml-2'>{todoItem?.task}</h1>
                    </div>
                </div>
                <div className="flex items-center mt-1 justify-between">
                    <div className="">
                        <span className='text-sm'>{todoItem?.date}</span>
                        { todoItem?.CompleteDate && <span className='text-sm'> - {todoItem?.CompleteDate}</span>}
                    </div>
                    <div className="flex items-center">
                        <label onClick={() => setEditeModal(todoItem)} disabled={todoItem.status === 'complete'} for="Edite-modal" className='btn btn-xs text-blue-800 hover:bg-green-600 hover:text-white border-0 outline-none bg-blue-200'><FiEdit /></label>
                        <button onClick={() => handleDelete()} className='btn text-red-800 text-xl font-bold ml-2 btn-xs btn-ghost'> <AiFillDelete /> </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;