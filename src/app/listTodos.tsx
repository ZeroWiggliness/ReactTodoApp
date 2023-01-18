
import * as _ from "lodash";
import * as React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete } from "./reducers/topics";
import { useAppSelector } from "./reduxHooks";
import TodoItem from "./todoItem";

type Props = {
	index: number;
}

function ListTodos(props : Props) {
	const todos = useAppSelector(state => state.topics.topics[props.index].items);
	const dispatch = useDispatch();

	const topicItems = _.map(todos, (value, index) => {
		return <TodoItem
			name={value.name}
			complete={value.complete}
			key={index}
			onDelete={() => dispatch(deleteTodo({index: props.index, todoIndex: _.toNumber(index)}))}
			onComplete={() => dispatch(toggleComplete({index: props.index, todoIndex: _.toNumber(index)}))}
			/>
	});

	return <table className="table">
		<thead>
			<tr>
				<th scope="col">Todos</th>
				<th scope="col">Status</th>
				<th scope="col">Action</th>
			</tr>
		</thead>
		<tbody>
			{topicItems}
		</tbody>
	</table>;
}

export default ListTodos;