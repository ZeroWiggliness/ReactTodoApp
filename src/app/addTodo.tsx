
import * as React from "react";
import { useDispatch } from "react-redux";
import AddButton from "./addButton";
import { addTodo } from "./reducers/topics"

type Props = {
	ind: number;
}

function AddTodo(props : Props) {
	const dispatch = useDispatch();

	return <div>
		<AddButton id="todoName" placeholder="Todo title" onSubmit={(name: string) => dispatch(addTodo({ index: props.ind, name}))}/>
	</div>;
}

export default AddTodo;