var React = require('react')
var ReactDom = require('react-dom')
import {Router,Route,hashHistory} from 'react-router';
import MediaQuery from 'react-responsive'
// import PCIndex from './components/pc_index';
// import PCBlogDetails from './components/pc_blog_details';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import noteApp from './src/reducers/index'
import App from "./src/components/app"
import Detail from "./src/components/detail"
let store = createStore(noteApp,applyMiddleware(thunk))
// 每次state变化都会触发此方法
store.subscribe(function () {
	// 打印状态树
	console.log(store.getState())
})
// 1224
// // <Route path="/details/:id" component={PCBlogDetails}></Route>
class Root extends React.Component{
	render(){
		return(
			<div>
			<Provider store={store}>
				<MediaQuery query='(min-device-width:200px)'>
					<Router history={hashHistory}>
						<Route path="/" component={App}></Route>
						<Route path="/details/:id" component={Detail}></Route>
					</Router>
				</MediaQuery>
			</Provider>
			</div>
		)
	}
}
ReactDom.render(
	<Root/>,
	document.getElementById('root')
)