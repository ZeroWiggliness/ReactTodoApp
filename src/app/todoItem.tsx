
import * as _ from "lodash";
import * as React from "react";

type Props = {
	name: string;
	complete: boolean;
	onDelete: () => void;
	onComplete: () => void;
}

function TodoItem(props: Props) {
	return <tr>
		<th scope="row">{props.name}</th>
		<td>
			{
				props.complete ? "Completed" : "To Do"
			}
		</td>
		<td>
			<button type="button" className="btn btn-primary" onClick={props.onComplete}>Toggle</button>
			<button type="button" className="btn btn-primary" onClick={props.onDelete}>Delete</button>
		</td>
  </tr>;
}

export default TodoItem;