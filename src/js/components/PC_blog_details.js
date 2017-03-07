var React = require('react')
import $ from 'jquery';
import {Router, Route, Link, browserHistory} from 'react-router'
export default class PCBlogDetails extends React.Component{
	componentDidMount(){
		$.get('../../content/' + this.props.params.id + '/'+ this.props.params.id +'.html')
		.fail(function (e) {
			console.log(e)
		})
		.done(function (data) {
			let htmlData = data.replace(/src="/g,'src="./content/'+this.props.params.id+'/')
			let articalDom = this.refs.detail_content_wrap;
			articalDom.innerHTML = htmlData;

			let $demo = $(articalDom).find('.demo');
			if($demo.hasClass("code-demo")){
				return false
			};
			$demo.each((index,value)=>{
		    	$(value).wrap('<div class="demo-wrap js-demo-wrap"></div>');
		    	$(value).parent().append('<h4>效果</h4><iframe class="show-demo" name="win'+index+'"></iframe>');
		    	var newwin = window.open("",("win"+index));
			    newwin.opener = null;
			    newwin.document.write($(value).val());
			})
		}.bind(this))
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