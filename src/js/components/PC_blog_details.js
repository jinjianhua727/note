var React = require('react')
// import $ from 'jquery';
import {Router, Route, Link, browserHistory} from 'react-router'
export default class PCBlogDetails extends React.Component{
	componentDidMount(){
		var myFetchOptions = {
			method: 'GET'
		};
		// github src/
		// console.log('content/' + this.props.params.id + '/'+ this.props.params.id +'.html')
		fetch('src/content/' + this.props.params.id + '/'+ this.props.params.id +'.html', myFetchOptions)
		.then(response=>{
			// console.log(response)
			return response.text()
		})
		.then(data=>{
			// github /src="/g,'src="./src/content/'+this.props.params.id+'/'
			// console.log(data)
			let htmlData = data.replace(/src="/g,'src="./src/content/'+this.props.params.id+'/')
			// console.log(htmlData)
			let articalDom = this.refs.detail_content_wrap;
			articalDom.innerHTML = htmlData;

			let demo = articalDom.querySelectorAll('.demo');
			// 遗漏bug
			// if(demo.classList.contains("code-demo")){
			// 	return false
			// };
			[].forEach.call(demo, (value,index)=>{
				// console.log(value)
				let parentNode = value.parentNode;
				let cloneDemo = value.cloneNode(true)
				let demoWrap = document.createElement('div')
				let demoViewTitle = document.createElement('h4')
				demoWrap.className = 'demo-wrap js-demo-wrap'
				demoWrap.innerHTML = '<h4>效果</h4><iframe class="show-demo" name="win'+index+'"></iframe>'
				demoWrap.insertBefore(cloneDemo, demoWrap.firstChild);
				// value.remove()
				parentNode.replaceChild(demoWrap,value)
				var newwin = window.open("",("win"+index));
			    newwin.opener = null;
			    newwin.document.write(value.value);
			});
		})

		// $.get('src/content/' + this.props.params.id + '/'+ this.props.params.id +'.html')
		// .fail(function (e) {
		// 	console.log(e)
		// })
		// .done(function (data) {
		// 	let htmlData = data.replace(/src="/g,'src="./src/content/'+this.props.params.id+'/')
		// 	let articalDom = this.refs.detail_content_wrap;
		// 	articalDom.innerHTML = htmlData;

		// 	let $demo = $(articalDom).find('.demo');
		// 	if($demo.hasClass("code-demo")){
		// 		return false
		// 	};
		// 	$demo.each((index,value)=>{
		//     	$(value).wrap('<div class="demo-wrap js-demo-wrap"></div>');
		//     	$(value).parent().append('<h4>效果</h4><iframe class="show-demo" name="win'+index+'"></iframe>');
		//     	var newwin = window.open("",("win"+index));
		// 	    newwin.opener = null;
		// 	    newwin.document.write($(value).val());
		// 	})
		// }.bind(this))
	}
	render(){
		return (
			<div ref='detail_wrap' className='detail-wrap'>
				<div ref='detail_content_wrap' className='artical'></div>
				<div className='detail_content_common'>
					<Link to={`/`} className="artical-btn">
						返回列表页
					</Link>
				</div>
			</div>
		)
	}
}