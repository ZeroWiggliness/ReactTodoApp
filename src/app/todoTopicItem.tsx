
import * as _ from "lodash";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store"
import AddButton from "./addButton";
import { addTopic } from "./reducers/topics"
import { useAppSelector } from "./reduxHooks";
import { Link } from "react-router-dom";

type Props = {
	name: string;
	ind: number;
	onDelete: () => void;
}

function TodoTopicItem(props: Props) {

	let add = "topic/" + props.ind;

	return <tr>
		<th scope="row">
			<Link to={add}>{props.name}</Link>
		</th>
		<td>
			<button type="button" className="btn btn-primary" onClick={props.onDelete}>Delete</button>
		</td>
  </tr>;
}

export default TodoTopicItem;