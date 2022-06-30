import React from 'react';

const Notfound = () => {
    return (
        <div className='mx-4 md:mx-8 lg:mx-16 h-screen flex items-center justify-center  pt-24'>
            <div className="border border-accent border-x-4 w-full md:w-[50%] mx-auto text-center rounded-xl p-3">
                <h1 className='text-2xl text-accent'>Ops..! No 404 Error..</h1>
                <h1 className='text-xl text-accent'>..page note found...</h1>
                <h1 className='text-xl text-accent'>...Pleace try again...</h1>
            </div>
        </div>
    );
};

export default Notfound;