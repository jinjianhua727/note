var React = require('react')

export default class CommonType extends React.Component{
	constructor(){
		super()
		this.state = {
			activeType : ['all'],
			types : []
		}
		
	}
	componentDidMount(){
		// console.log(this.props.types)
		// setTimeout(()=>{
		// 	console.log(this.props.types)
		// },3000)
		
	}
	getTypes(types){
		// console.log('getTypes')
		this.setState({
			types : types
		})
	}
	changeType(e){
		var type = e.target.getAttribute('data-type')
		if(this.state.activeType.indexOf(type)<0){
			let activeType = [];
			activeType.push(type)
			this.setState({
				activeType : activeType
			})
			this.props.switchBlog(activeType)
			this.props.switchTagByType(type)
		}
		
	}
	switchTypeActiveTag(activeType){
		this.setState({
			activeType : activeType
		})
	}
	render(){
		let types = this.state.types
		let showType = types.length>0
		?
		types.map(function (value,index) {
			let className = this.state.activeType.indexOf(value) >=0 ? 'type-btn active' :'type-btn'
			return <button  key={index} onClick={this.changeType.bind(this)} data-type={value} className={className}>{value}</button>
		}.bind(this))
		:
		'正在加载中'
		return (
			<div className='type-wrap'>
				{showType}
			</div>
		)
	}
}