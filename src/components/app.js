import React from 'react';
import List from './list';
import AddType from "../containers/addType";
import AddTag from "../containers/addTag";
const App = () =>(
	<div className="index-root">
		<div className="header">
			<AddType/>
		</div>
		<div className='pc_content'>
			<div className='content'>
				<List />
			</div>
		</div>
		<AddTag />
	</div>
);
export default App;

