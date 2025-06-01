import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const ViewPaste = () => {

    const {id} = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.filter((p) => p._id === id)[0];
    return (
        <div>
            <div className='bg-black/30 m-5 rounded-2xl h-[70vh] min-w-[50vw]'>
                <textarea className='h-full w-full p-5 rounded-2xl'
                    value={paste.content}
                    placeholder='Enter Content Here'
                    disabled
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default ViewPaste
