import React, { Component } from 'react'

export class GameConfig extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      lines: 16,
      columns: 16,
      mines: 40
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event, field){
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    event.preventDefault();
    const {config} = this.props
    config(this.state)
  }

  render() {
    const {lines, columns, mines } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="lines" value={lines} onChange={this.handleChange} />
          <input type="text" name="columns" value={columns} onChange={this.handleChange} />
          <input type="text" name="mines" value={mines} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default GameConfig
