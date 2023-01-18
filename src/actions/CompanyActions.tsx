import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as CompanyTypes from "../types/AppCompanyTypes"
import { CompanyDto, CompanyShortDto, OfficeDto } from "../types/LotTypes";
import { find, isNil } from 'lodash'
import { useAuth } from "../components/router/AuthContext";

export function getCompanyFromId(id: string, companies: CompanyDto[]): CompanyDto {
    return find(companies, (item) => item.id == id);
}

export function getCompanyOfficeFromId(id: string, offices: OfficeDto[]): OfficeDto {
    if(isNil(offices) || offices.length == 0)
        return undefined;
    return find(offices, (item) => item.id == id);
}

export const createCompany = createAsyncThunk<CompanyDto, string>(
    'company/create',
    async (companyDto, thunkAPI) => {
		let auth = useAuth();
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/company`,
        {
            method: 'POST',
            mode: 'cors',
            signal: thunkAPI.signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + thunkAPI.getState().auth.user.access_token,
            },
            body: JSON.stringify(companyDto)
        })
        .then(response => response.json())
        .catch(error => thunkAPI.rejectWithValue(null))

        return response;
    }
);

export const getCompanyList = createAsyncThunk<CompanyShortDto, string>(
    'company/list',
    async (CompanyShortDto, thunkAPI) => {
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/company/list`,
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

export const getCompanyFull = createAsyncThunk<{ companyId: string }, string>(
    'company/full',
    async (companyId, thunkAPI) => {
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/company/${companyId}`,
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

export const deleteCompany = createAsyncThunk<{ companyId: string }, string>(
    'company/delete',
    async (companyId, thunkAPI) => {
        const response = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/company/${companyId}`,
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