var React = require('react')
var ReactDom = require('react-dom')
import {Router,Route,hashHistory} from 'react-router';
import MediaQuery from 'react-responsive'
import PCIndex from './components/pc_index';

// 1224
export default class Root extends React.Component{
	render(){
		return(
			<div>
				<MediaQuery query='(min-device-width:200px)'>
					<Router history={hashHistory}>
						<Route path="/" component={PCIndex}></Route>
					</Router>
				</MediaQuery>
			</div>
		)
	}
}
ReactDom.render(
	<Root/>,
	document.getElementById('root')
)