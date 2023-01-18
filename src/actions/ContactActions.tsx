import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContactDto, ContactShortDto } from "../types/LotTypes";

export const createContact = createAsyncThunk<ContactDto, string>(
    'Contact/create',
    async (ContactDto, thunkAPI) => {
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/Contact`,  
        {
            method: 'POST',
            mode: 'cors',
            signal: thunkAPI.signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + thunkAPI.getState().auth.user.access_token, 
            },
            body: JSON.stringify(ContactDto)
        })
        .then(response => response.json())
        .catch(error => thunkAPI.rejectWithValue(null))

        return response;
    }
);

export const getContactList = createAsyncThunk<ContactShortDto, string>(
    'Contact/list',
    async (ContactShortDto, thunkAPI) => {
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/Contact/list`,  
        {
            method: 'GET',
            mode: 'cors',
            signal: thunkAPI.signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + thunkAPI.getState().auth.user.access_token, 
            }
        })
        .then(response => response.json())
        .catch(error => thunkAPI.rejectWithValue(null))

        return response;
    }
);

export const getContactFull = createAsyncThunk<{ ContactId: string }, string>(
    'Contact/full',
    async (ContactId, thunkAPI) => {
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/Contact/${ContactId}`,  
        {
            method: 'GET',
            mode: 'cors',
            signal: thunkAPI.signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + thunkAPI.getState().auth.user.access_token, 
            }
        })
        .then(response => response.json())
        .catch(error => thunkAPI.rejectWithValue(null))

        return response;
    }
);

export const deleteContact = createAsyncThunk<{ ContactId: string }, string>(
    'Contact/delete',
    async (ContactId, thunkAPI) => {
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/Contact/${ContactId}`,  
        {
            method: 'DELETE',
            mode: 'cors',
            signal: thunkAPI.signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + thunkAPI.getState().auth.user.access_token, 
            }
        })
        .then(response => response.json())
        .catch(error => thunkAPI.rejectWithValue(null))

        return response;
    }
);