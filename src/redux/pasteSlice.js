import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

let pastes = [];
try {
  const stored = localStorage.getItem("pastes");
  pastes = stored ? JSON.parse(stored) : [];
} catch {
  pastes = [];
  localStorage.removeItem("pastes");
}

const initialState = { pastes };

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Note created successfully");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id)
      if(index>=0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Note updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId)
      if(index>=0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Note deleted");
      }
    },
  },
});

export const { addToPaste, updateToPaste, resetAllPastes, removeFromPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
