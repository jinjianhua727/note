var React = require('react')

export default class CommonType extends React.Component{
	constructor(){
		super()
		this.state = {
			activeId : 0,
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
		console.log('getTypes')
		this.setState({
			types : types
		})
	}
	changeType(e){
		var id = e.target.getAttribute('data-type-id')
		if(id != this.state.activeId){
			this.setState({
				activeId : id
			})
			this.render()
		}
		
	}
	render(){
		let types = this.state.types
		let showType = types.length>0
		?
		types.map(function (value,index) {
			let className = this.state.activeId == index ? 'active' :''
			return <button onClick={this.changeType.bind(this)} data-type-id={index} className={className}>{value}</button>
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