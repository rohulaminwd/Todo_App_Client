import React from 'react';
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import { toast } from 'react-toastify';

const TodoCard = ({todoItem, refetch, setEditeModal}) => {
    
    const handleDelete = () => {
        fetch(`http://localhost:5000/todo/${todoItem._id}`, {
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

        fetch(`http://localhost:5000/todo/${todoItem._id}`, {
            method: 'PUT',
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
        <div className="bg-white rounded-lg p-3 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/* <h1 className='text-xl font-bold text-cyan-800 mr-2'>1</h1> */}
                    <div className="">
                        <input onClick={() => handleComplete()} checked={todoItem.status === "complete"? true: false} type="checkbox" class="checkbox mt-1 border-2 checkbox-accent" />
                    </div>
                    <div className="ml-3">
                        <h1 className='text-green-600 sm:text-xl font-bold'>{todoItem?.task}</h1>
                        <span className='text-sm'>{todoItem?.date}</span>
                    </div>
                </div>
                <div className="flex items-center ">
                    <label onClick={() => setEditeModal(todoItem)} disabled={todoItem.status === 'complete'} for="Edite-modal" className='btn btn-sm text-cyan-500 border-0 outline-none bg-cyan-200'><FiEdit /></label>
                    <button onClick={() => handleDelete()} className='btn text-red-800 text-xl font-bold ml-2 btn-sm btn-ghost'> <AiFillDelete /> </button>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;