
import * as _ from "lodash";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTodoTopic from "./addTodoTopic";
import ListTodoTopics from "./listTodoTopics";
import { deleteTopic } from "./reducers/topics";
import { useAppSelector } from "./reduxHooks";
import TodoTopicItem from "./todoTopicItem";

type Props = {
}

function Topics(props : Props) {
	return <>
	<div className="col-8">
		<h3>Groups</h3>
		<ListTodoTopics/>
	</div>
	<div className="col">
		<h3>Add Group</h3>
		<AddTodoTopic/>
	</div>
</>;
}

export default Topics;