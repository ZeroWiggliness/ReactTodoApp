import { FormEvent, ChangeEvent, useState } from "react";
import * as React from "react";

type Props = {
	id: string;
	placeholder: string;
	onSubmit: (name: string) => void
};

export default function AddButton(props : Props) {
	const [input, setInput] = useState("");

	function updateInput(event: ChangeEvent<HTMLInputElement>) {
		setInput(event.target.value);
	}

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		props.onSubmit(input);
		setInput("");
		event.preventDefault();
	}

	return <div>
		<form onSubmit={(event) => onSubmit(event)}>
			<div className="form-group">
				<label htmlFor={props.id}>Name</label>
				<input type="text" className="form-control" id={props.id} placeholder={props.placeholder} value={input} onChange={(event) => updateInput(event)}/>
				<small id={props.id + "help"} className="form-text text-muted">Group name here</small>
			</div>
			<button type="submit" className="btn btn-primary" disabled={input == ""}>Add</button>
		</form>
	</div>;
}