import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PencilIcon, TrashIcon, ClipboardIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchterm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <input className='p-2 h-10 w-[90vw] md:w-[60vw] text-black border border-black rounded-xl mb-5 '
                type="text"
                placeholder='Search Here'
                value={searchTerm}
                onChange={(e) => setSearchterm(e.target.value)}
            />
            <div className='flex flex-col gap-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div className='rounded-2xl shadow-black/15 shadow-2xl w-[90vw] md:w-[60vw] p-3 text-gray-500 text-[1.1rem]' key={paste?._id}>
                                    <div className='text-[1.2rem] text-indigo-500 flex justify-between'>
                                        <p className='text-[1.5rem]'>{paste.title}</p>
                                        <div className='flex flex-row gap-2'>
                                            <button className='border border-gray-400 h-8 w-9 rounded-[0.5rem] hover:border-indigo-500 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200'>
                                                <a href={`/?pasteId=${paste?._id}`}>
                                                    <PencilIcon className='w-4 h-4 text-black' />
                                                </a>
                                            </button>
                                            <button className='border border-gray-400 h-8 w-9 rounded-[0.5rem] hover:border-indigo-500 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200'>
                                                <a href={`pastes/${paste?._id}`}>
                                                    <EyeIcon className='w-4 h-4 text-black' />
                                                </a>
                                            </button>
                                            <button onClick={() => handleDelete(paste?._id)} className='border border-gray-400 h-8 w-9 rounded-[0.5rem] hover:border-indigo-500 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200'>
                                                <TrashIcon className='w-4 h-4 text-black' />
                                            </button>
                                            <button onClick={() => {
                                                navigator.clipboard.writeText(paste?.content)
                                                toast.success("Copied to Clipboard")
                                            }} className='border border-gray-400 h-8 w-9 rounded-[0.5rem] hover:border-indigo-500 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200'>
                                                <ClipboardIcon className='w-4 h-4 text-black' />
                                            </button>
                                            <button className='border border-gray-400 h-8 w-9 rounded-[0.5rem] hover:border-indigo-500 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200'>
                                                <ShareIcon className='w-4 h-4 text-black' />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Paste
