import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor () {
      super();
      this.state = {
          formControls: {
              x1:'',
              x2:'',
              operation:'add'
          },
          lengkap:true
      }
  }

  changeHandler = event => {

      const name = event.target.name;
      const value = event.target.value;
      this.setState(state=>{
          state.formControls[name] = value;
          return state;
      })

  }

  _tidakLengkap = () =>{
      this.setState(state=>{
          state.lengkap = false;
          return state;
      })
  }

  formSubmitHandler = () => {
      if(this.state.formControls.operation != "fac"){
        if(this.state.formControls.x1.length != 0 && this.state.formControls.x2.length != 0){
            this.setState(state=>{
                state.label = true;
            },()=>{
                this.props.onSubmitForm(this.state.formControls);
            })
        }else{
            console.log("Tidak lengkap")
            this._tidakLengkap();
        }
      }else{
        if(this.state.formControls.x1.length != 0){
            this.setState(state=>{
                state.label = true;
            },()=>{
                this.props.onSubmitForm(this.state.formControls);
            })
        }else{
            console.log("Tidak lengkap")
            this._tidakLengkap();
        }
      }
  }

  render() {
    return (
      <div className="form-container">
        <label className="bold">
            Turing Machine Visualization
        </label>
        <div className="separator"></div>
        <div className="input-container">
            <input  type="number"
                    name="x1"
                    min="0"
                    placeholder="First Number"
                    className="input-number"
                    value={this.state.formControls.x1}
                    onChange={this.changeHandler}
            />
            {(this.state.formControls.operation == "fac") ?
            <input  type="number"
            name="x2"
            min="0"
            placeholder="Second Number"
            className="input-number"
            value={this.state.formControls.x2}
            onChange={this.changeHandler}
            disabled
            /> :
            <input  type="number"
                    name="x2"
                    min="0"
                    placeholder="Second Number"
                    className="input-number"
                    value={this.state.formControls.x2}
                    onChange={this.changeHandler}
            />
            }
            <select className="input-dropdown" name="operation" value={this.state.formControls.operation} onChange={this.changeHandler}>
                <option value="add">Additional</option>
                <option value="sub">Subtractional</option>
                <option value="mult">Multiplication</option>
                <option value="div">Division</option>
                <option value="fac">Factorial</option>
            </select>
            {(this.props.isAnimate) ?
            <button onClick={this.formSubmitHandler} className="input-button" disabled>Hitung</button > :
            <button onClick={this.formSubmitHandler} className="input-button">Calculate</button>}
        </div>
            {(this.state.lengkap) ? null : <label>Input tidak lengkap</label>}
      </div>
    );
  }
}

export default Form;
