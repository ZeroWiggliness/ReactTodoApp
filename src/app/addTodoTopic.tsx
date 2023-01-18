
import * as React from "react";
import { useDispatch } from "react-redux";
import AddButton from "./addButton";
import { addTopic } from "./reducers/topics"

type Props = {
}

function AddTodoTopic(props : Props) {
	const dispatch = useDispatch();

	return <div>
		<AddButton id="topicName" placeholder="Topic Name" onSubmit={(name: string) => dispatch(addTopic(name))}/>
	</div>;
}

export default AddTodoTopic;