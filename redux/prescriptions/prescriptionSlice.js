import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prescriptions: [],
};

const prescriptionSlice = createSlice(
  {
    name: 'prescription',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(AddPrescriptions.fulfilled, (state, action) => {
          state.currentUser = action.payload;
        })
        .addCase(AddPrescriptions.rejected, (state, action) => {
          state.error = action.payload;
        });
    },
  },
);

export const { checkStatus } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;