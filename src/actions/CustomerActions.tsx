import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerDto } from "../types/LotTypes";
import { postToEndpoint, getFromEndpoint, getFromEndpointWithId, deleteEndpoint } from "../components/DataHelpers"


export const createCustomer = (dto: CustomerDto) => postToEndpoint<CustomerDto, string>("customer/create", "api/v1/customer", dto);

export const deleteCustomer = (id: string) => deleteEndpoint<CustomerDto, string>("customer/delete", "api/v1/customer", id);
export const getCustomer = (id: string) => getFromEndpointWithId<CustomerDto, string>("customer/get", "api/v1/customer", id);
export const getCustomerList = getFromEndpoint<CustomerDto, string>("customer/list", "api/v1/customer/list");
