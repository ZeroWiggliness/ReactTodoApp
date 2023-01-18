
import * as _ from "lodash";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTopic } from "./reducers/topics";
import { useAppSelector } from "./reduxHooks";
import TodoTopicItem from "./todoTopicItem";

type Props = {
}

function ListTodoTopics(props : Props) {
	const topics = useAppSelector(state => state.topics.topics);
	const dispatch = useDispatch();

	const topicItems = _.map(topics, (value, index) => {
		return <TodoTopicItem name={value.name} key={index} ind={index} onDelete={() => dispatch(deleteTopic(index))}></TodoTopicItem>
	});

	return <table className="table">
		<thead>
			<tr>
				<th scope="col">Topic Name</th>
				<th scope="col">Delete</th>
			</tr>
		</thead>
		<tbody>
			{topicItems}
		</tbody>
	</table>;
}

export default ListTodoTopics;