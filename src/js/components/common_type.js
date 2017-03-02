var React = require('react')

export default class CommonType extends React.Component{
	constructor(){
		super()
		this.state = {
			activeId : 0
		}
		
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
		let types = ['js','h5','react']
		let showType = types.length>0
		?
		types.map(function (value,index) {
			let className = this.state.activeId == index ? 'active' :''
			return <button onClick={this.changeType.bind(this)} data-type-id={index} className={className}>{value}</button>
		}.bind(this))
		:
		'没有加载到数据'
		return (
			<div className='type-wrap'>
				{showType}
			</div>
		)
	}
}