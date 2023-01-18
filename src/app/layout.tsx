
import * as _ from "lodash";
import * as React from "react";
import { Outlet } from "react-router";

type Props = {
}

function Layout(props : Props) {
	return <div className="row">
		<Outlet/>
	</div>;
}

export default Layout;