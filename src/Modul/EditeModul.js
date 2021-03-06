import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const EditeModul = ({editeModal, refetch, setEditeModal}) => {
 
    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        const task = data.task;
        const title = data.title;
        
        const todoTask = {
            task: task,
            title: title,
        }

        fetch(`https://arcane-wave-11590.herokuapp.com/todoUpdate/${editeModal._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(todoTask)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                reset();
                setEditeModal(null);
                refetch(); 
            }
        })
    }
    return (
        <div>
            <input type="checkbox" id="Edite-modal" class="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <label for="Edite-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-xl font-bold text-cyan-600 mb-2'>Edite Todo Item</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="flex w-full justify-between gap-x-2">
                            <div className="w-full">
                                <input 
                                    type="text" 
                                    placeholder="Task Title" 
                                    class="input w-full input-bordered input-sm input-success" 
                                    {...register("title", {
                                        required: {
                                        value: true,
                                        message: 'title is required'  
                                        },
                                    })}
                                />
                                <label className="label">
                                    {errors.title?.type === 'required' && <span className="label-text-alt text-red-500">{errors.title.message}</span>}
                                </label>
                            </div>
                            <div className="w-full">
                                <input type="date" class="input w-full input-bordered input-sm input-success" name="date" id="" />
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="w-full">
                                <input 
                                    type="text" 
                                    placeholder="Task Description" 
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditeModul;