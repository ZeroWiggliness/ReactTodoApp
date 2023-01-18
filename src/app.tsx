import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

// requires jquery which uses expose
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/popover";

import { store } from "./app/store";
import Layout from "./app/layout";
import Topics from "./app/Topics";
import Topic from "./app/topic";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
<Provider store={store}>
	<BrowserRouter>
		<nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">ToDo Sample App</a>

                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    </li>
                </ul>
            </nav>
		<div className="container-fluid">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Topics/>} />
					<Route path="topic/:topicid" element={<Topic/>} />
				</Route>
			</Routes>
        </div>
		<footer className="footer mt-auto py-3">
            <div className="container">
                <span className="text-muted">Footer</span>
            </div>
        </footer>
	</BrowserRouter>
</Provider>
);
