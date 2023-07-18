import React from 'react';
import './app.css';
import '../demo.css';
import Nested from '../pages/nested';
import KanbanBoard from "../pages/kanban-board"

const App = () => {
		return (
			<div className="app_">
					<div className="demo_">
						{/* <Nested /> */}
						<KanbanBoard />
					</div>
			</div>
		);
}
export default App;

