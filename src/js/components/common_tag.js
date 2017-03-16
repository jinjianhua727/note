var React = require('react')

export default class CommonTag extends React.Component{
	constructor(){
		super()
		this.state = {
			activeTag : [],
			tags : []
		}
		
	}
	componentDidMount(){
		// console.log(this.props.types)
		// setTimeout(()=>{
		// 	console.log(this.props.types)
		// },3000)
		
	}
	getTags(tags){
		// console.log('getTags')
		this.setState({
			tags : tags
		})
	}
	changeTag(e){
		let tag = e.target.getAttribute('data-tag')
		let activeTag=[]
		// console.log(this.state.activeTag.indexOf(tag))
		if(this.state.activeTag.indexOf(tag)<0){
			activeTag.push(tag)
			this.setState({
				activeTag : activeTag
			})
			// console.log(this.props)
			this.props.switchNotesByTag(tag)
			this.props.switchTypeActiveTag(tag)
		}
		
	}
	switchTagByType(activeTag){
		this.setState({
			activeTag : activeTag
		})
	}
	render(){
		let tags = this.state.tags
		let showTag = tags.length>0
		?
		tags.map(function (value,index) {
			let className = this.state.activeTag.indexOf(value) >=0 ? 'tag-btn active' :'tag-btn'
			return <button  key={index} onClick={this.changeTag.bind(this)} data-tag={value} className={className}>{value}</button>
			
		}.bind(this))
		:
		'正在加载中'
		return (
			<div className='tag-wrap'>
				<p>标签：</p>
				{showTag}
			</div>
		)
	}
}