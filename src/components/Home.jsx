import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPaste = useSelector((state) => state.paste.pastes)

    useEffect(() => {
        if (pasteId) {
            const paste = allPaste.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createAt: new Date().toISOString(),
        }

        if (pasteId) {
            dispatch(updateToPaste(paste))
        } else {
            dispatch(addToPaste(paste))
        }
        setTitle('')
        setValue('')
        setSearchParams({});
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row gap-7 justify-evenly w-[90vw] md:w-[60vw]'>
                <input className=' text-black border border-black p-2 rounded-xl text-center w-[32vw] md:w-[15vw] '
                    type="text"
                    placeholder='Enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={createPaste} className='bg-blue-900 h-10 rounded-2xl ml-5 hover:cursor-pointer w-[32vw] md:w-[15vw]'>
                    {
                        pasteId ? "Update Paste" : "Create Paste"
                    }
                </button>
            </div>
            <div className='text-black border border-black shadow-2xl m-5 rounded-2xl h-[70vh] min-w-[50vw]'>
                <textarea className='h-full w-full p-5 rounded-2xl'
                    value={value}
                    placeholder='Enter Content Here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default Home
