import { CalendarItemDto, CalendarEventDto } from "../types/LotTypes";
import { postToEndpoint, deleteEndpoint, getFromEndpointWithId, getFromEndpoint, getFromEndpointWithSearchId } from "../components/DataHelpers"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../reducers/RootReducer";
import { find } from "lodash";
import { RootState } from "../reducers/store";


export const createCalendarItem = (dto: CalendarItemDto) => postToEndpoint<CalendarItemDto, string>("calendar/create", "api/v1/calendar", dto);
export const deleteCalendarItem = (id: string) => deleteEndpoint<string, string>("calendar/delete", "api/v1/calendar", id);
//export const getCalendarItem = (id: string) => getFromEndpointWithId<CalendarItemDto, string>("calendar/get", "api/v1/calendar", id);
export const getCalendarItemList = (startDate: Date, endDate: Date, range: string) => getFromEndpoint<CalendarItemDto, string>("calendar/list", `api/v1/calendar/${startDate.toISOString()}/${endDate.toISOString()}/${range}`)("");


export const createCalendarEvent = (dto: CalendarEventDto) => postToEndpoint<CalendarEventDto, string>("calendar/events/create", "api/v1/calendar/events", dto);
export const deleteCalendarEvent = (id: string) => deleteEndpoint<string, string>("calendar/events/delete", "api/v1/calendar/events", id);
/*export const getCalendarEvent = (id: string) => {
	console.log("called");
	const v = getFromEndpointWithSearchId<CalendarEventDto>("calendar/events/get", "api/v1/calendar/events", id);
	console.log("called2");
	return v;
}*/


export const getCalendarItem = (id: string) => getFromEndpointWithSearchId<CalendarItemDto>("calendar/get", "api/v1/calendar", id, (idToFind: string, state: RootState) => { return find(state.app.calendar.calendarItems, (ci) => ci.id == idToFind );  });
