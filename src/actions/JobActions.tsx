import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JobDto, JobAdvDto } from "../types/LotTypes";
import { postToEndpoint, deleteEndpoint, getFromEndpointWithId, getFromEndpoint } from "../components/DataHelpers";


export const createJob = (dto: JobDto) => postToEndpoint<JobDto, string>("job/create", "api/v1/jobs", dto);
export const deleteJob = (id: string) => deleteEndpoint<string, string>("job/delete", "api/v1/jobs", id);
export const getJob = (id: string) => getFromEndpointWithId<JobDto, string>("job/get", "api/v1/jobs", id);
export const getJobList = getFromEndpoint<JobDto, string>("job/list", "api/v1/jobs/list");


export const createJobUnit = (dto: JobDto) => postToEndpoint<JobDto, string>("jobunit/create", "api/v1/jobs/units", dto);
export const deleteJobUnit = (id: string) => deleteEndpoint<string, string>("jobunit/delete", "api/v1/jobs/units", id);
export const getJobUnit = (id: string) => getFromEndpointWithId<JobDto, string>("jobunit/get", "api/v1/jobs/units", id);
export const getJobUnitList = getFromEndpoint<JobDto, string>("jobunit/get", "api/v1/jobs/units/list");


export const getJobAdv = (id: string) => getFromEndpointWithId<JobAdvDto, string>("jobadv/get", "api/v1/jobs/adv", id);