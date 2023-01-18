import { ExpenseDto, InvoiceBasicDto, ResultDto, PaymentAccountDto } from "../types/LotTypes";
import { postToEndpoint, deleteEndpoint, getFromEndpointWithId, getFromEndpoint, downloadFileFromEndpointWithId, putToEndpoint, postFilesToEndpoint } from "../components/DataHelpers";
import { CreateOrUpdateStatus } from "../reducers/AppReducer";
import { forEach, values } from "lodash";
import { StoreState } from "../reducers/RootReducer";
import { emptyGuid } from "../types/LotTypesEmpty";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createInvoice4 = createAsyncThunk<ResultDto, InvoiceBasicDto>(
	"invoices/create",
	async (dto: InvoiceBasicDto, thunkApi) => {
		const access_token = "Bearer " + thunkApi.getState().auth.user.access_token;

		const createInvoiceRet = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/invoices`,
			{
				method: "POST",
				mode: "cors",
				signal: thunkApi.signal,
				headers: {
					"Content-Type": "application/json",
					"Authorization": access_token
				},
				body: JSON.stringify(dto)
			})
			.then(response => response.json() )
			.catch(error => thunkApi.rejectWithValue(null));

		console.log(createInvoiceRet);

		return createInvoiceRet;
	}
);

export const createInvoice3 = createAsyncThunk<InvoiceDto, InvoiceDto>(
	"invoices/create",
	async (dto: InvoiceDto, thunkApi) => {
		const access_token = "Bearer " + thunkApi.getState().auth.user.access_token;

		const formData = new FormData();
		const fValues = values(thunkApi.getState().app.app.files);
		forEach(fValues, (item) => {
			formData.append("files", item.file);
		});

		let uploadGroup = emptyGuid;
		if(dto.expenses.items.length > 0/* && fValues.length > 0*/) {
			uploadGroup = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/expenses/files`,
				{
					method: "POST",
					mode: "cors",
					//	signal: thunkAPI.signal,
					headers: {
						//		"Content-Type": "multipart/form-data",
						"Authorization": access_token,
					},
					body: formData
				}).then(response => response.text());
			uploadGroup = uploadGroup.substring(1, 37);

			forEach(dto.expenses.items, (item) => {
				item.fileGroup = item.fileGroup == emptyGuid ? uploadGroup : item.fileGroup;
			});
		}

		const createInvoiceRet = await fetch(`https://${window.__APP_DATA__.hostname}/api/v1/invoices`,
			{
				method: "POST",
				mode: "cors",
				//	signal: thunkAPI.signal,
				headers: {
					"Content-Type": "application/json",
					"Authorization": access_token,
					"LotFileGroup": uploadGroup
				},
				body: JSON.stringify(dto)
			}).then(response => response.json() );

		console.log(createInvoiceRet);

		return createInvoiceRet;
	}
);


/*
const response = await fetch(`https://${window.__APP_DATA__.hostname}/${uri}`,
				{
					method: "POST",
					mode: "cors",
					signal: thunkAPI.signal,
					headers: {
				//		"Content-Type": "multipart/form-data",
						"Authorization": "Bearer " + thunkAPI.getState().auth.user.access_token,
					},
					body: formData
				})
				.then(response => {
					if(response.ok) {
						if(response.status === 204) return null;

						const contentType = response.headers.get('content-type');
						if(contentType.includes("application/json")) {
							return response.json();
						}
						return response.text();
					}
				})
				.catch(error => {
					return thunkAPI.rejectWithValue(null);
				});



*/




export const createInvoice = (dto: InvoiceDto) => postToEndpoint<InvoiceDto, string>("invoices/create", "api/v1/invoices", dto);
export const getInvoiceList = () => getFromEndpoint<InvoiceDto, string>("invoices/list", "api/v1/invoices/list")("");
export const getInvoice = (id: string) => getFromEndpointWithId<InvoiceDto, string>("invoices/get", "api/v1/invoices", id);
export const getInvoicePdf = (id: string, fileName: string) => downloadFileFromEndpointWithId("api/v1/invoices/download/pdf", id, fileName)();
//export const deleteCalendarItem = (id: string) => deleteEndpoint<string, string>("calendar/delete", "api/v1/calendar", id);
//export const getCalendarItem = (id: string) => getFromEndpointWithId<CalendarItemDto, string>("calendar/get", "api/v1/calendar", id);
//export const getCalendarItemList = (startDate: Date, endDate: Date, range: string) => getFromEndpoint<CalendarItemDto, string>("calendar/list", `api/v1/calendar/${startDate.toISOString()}/${endDate.toISOString()}/${range}`)("");


export const createPaymentAccount = (dto: PaymentAccountDto) => postToEndpoint<PaymentAccountDto, string>("payments/accounts/create", "api/v1/payments/accounts", dto);
export const updatePaymentAccount = (dto: PaymentAccountDto, id: string) => putToEndpoint<PaymentAccountDto, string>("payments/accounts/update", "api/v1/payments/accounts", id, dto);
export const getPaymentAccountList = () => getFromEndpoint<PaymentAccountDto, string>("payments/accounts/list", "api/v1/payments/accounts/list")("");

export const createExpense = (dto: ExpenseDto) => postToEndpoint<ExpenseDto, string>("expense/create", "api/v1/expenses", dto);
export const updateExpense = (dto: ExpenseDto, id: string) => putToEndpoint<ExpenseDto, string>("expense/update", "api/v1/expenses", id, dto);
export const getExpenseList = () => getFromEndpoint<ExpenseDto, string>("expense/list", "api/v1/expenses/list")("");

export const uploadExpenses = (formData: FormData) => postFilesToEndpoint("expense/upload", "api/v1/expenses", formData);