
import * as _ from "lodash";
import * as React from "react";
import { Navigate, useParams } from "react-router";
import AddTodo from "./addTodo";
import ListTodos from "./listTodos";
import { useAppSelector } from "./reduxHooks";

type Props = {
}

function Topic(props : Props) {
	const { topicid } = useParams();
	const topic = useAppSelector(state => state.topics.topics[_.toNumber(topicid)]);

	if(topic === undefined)
		return <Navigate to="/"/>;

	return <>
	<div className="col-8">
		<h3>Todos</h3>
		<ListTodos index={_.toNumber(topicid)}/>
	</div>
	<div className="col">
		<h3>Add Group</h3>
		<AddTodo ind={_.toNumber(topicid)}/>
	</div>
</>;
}

export default Topic;