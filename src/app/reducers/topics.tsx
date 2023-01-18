import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as _ from 'lodash';


interface TopicItem {
	name: string;
	complete: boolean;
}

interface Topic {
	name: string;
	items: TopicItem[];
}

interface TopicState {
	topics: Topic[]
}

const initialState: TopicState = {
	topics: [],
}

export const counterSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: (state, action: PayloadAction<string>) => {
      state.topics = [ ...state.topics, { name: action.payload, items: [] }];
    },
	addTodo: (state, action: PayloadAction<{index: number, name: string}>) => {
		state.topics[action.payload.index].items.push({name: action.payload.name, complete: false});
	},
    deleteTopic: (state, action: PayloadAction<number>) => {
		let newA = [ ...state.topics ];
		_.pullAt(newA, action.payload);
		state.topics = newA;
    },
	deleteTodo: (state, action: PayloadAction<{index: number, todoIndex: number}>) => {
		let topicItems = state.topics[action.payload.index].items;
		_.pullAt(topicItems, action.payload.todoIndex);
		state.topics[action.payload.index].items = topicItems;
	},
	toggleComplete: (state, action: PayloadAction<{index: number, todoIndex: number}>) => {
		state.topics[action.payload.index].items[action.payload.todoIndex].complete = !state.topics[action.payload.index].items[action.payload.todoIndex].complete;
	}
  },
})

// Action creators are generated for each case reducer function
export const { addTopic, deleteTopic, addTodo, deleteTodo, toggleComplete } = counterSlice.actions

export default counterSlice.reducer