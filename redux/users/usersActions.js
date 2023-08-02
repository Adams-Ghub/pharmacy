import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.js';

export const RegisterUser = createAsyncThunk(
  'user/register',
  async (
    { email, password, role, phone, registration },
    { rejectWithValue }
  ) => {
    try {
      let user = {};
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          user = userCredential.user;

          setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            role,
            registration: role == 'customer' ? 'none' : registration,
            name: 'unknown',
            photo: 'unknown',
            phone,
            pharmacy: role == 'customer' ? 'none' : 'unknown',
          });
        }
      );
      return user;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const UserLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      let loggedUser = {};
      await signInWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          loggedUser = { user: user.auth };
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          console.log('data:', docSnap.data());
          const data = docSnap.data();
          if (data) {
            loggedUser = { ...loggedUser, details: data };
          } else {
            loggedUser = { ...loggedUser, details: [] };
          }
        }
      );
      return loggedUser;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const GetAllUsers = createAsyncThunk(
  'user/getUsers',
  async ({ rejectWithValue }) => {
    try {
      let allUsers = {};

      const docRef = doc(db, "users", "1lyMJk4W3pRYLmxVkBNK05fBYw83");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        allUsers={...allUsers, data:docSnap.data()}
        console.log("Action:",docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      // const querySnapshot = await getDocs(collection(db, 'users'));
      // querySnapshot.forEach((doc) => {
       
      //   // console.log(doc.id, " => ", doc.data());
      //   // doc.data() is never undefined for query doc snapshots
      //   allUsers = [...allUsers, doc.data()];
      //   // console.log('getAll:', doc.data())
      // });
      
      return allUsers;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
