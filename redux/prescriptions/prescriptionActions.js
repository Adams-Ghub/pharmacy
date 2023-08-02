import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.js';

export const RegisterUser = createAsyncThunk(
  'user/register',
  async (
    { id,customerId,pharmacistId,prescription,date,customer },
    { rejectWithValue }
  ) => {
    try {
      
      await setDoc(doc(db, 'prescriptions', id), {
            id,
            role,
            customerId,
            pharmacistId,
            prescription,
            date,
            customer,           
          });
          
      
    } catch (error) {
      rejectWithValue(error);
    }
  }
);