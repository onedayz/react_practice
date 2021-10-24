import React,{Component} from "react";
import store from '../store'

class AddNumber extends Component{
    state = {size: 1}
    render(){
        return (
            <div>
                <h1>Add Number</h1>
                <input type="button" value="+" onClick={function (e){
                    store.dispatch({type:'INCREMENT', size: this.state.size})
                    // this.props.onClick(this.state.size);
                }.bind(this)}/>
                <input type="text" value={this.state.size} onChange={function(e){
                    this.setState({size: Number(e.target.value)})
                }.bind(this)}/>
            </div>
        )
    }
}

export default AddNumber;