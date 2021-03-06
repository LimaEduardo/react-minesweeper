import React, { Component } from 'react'

const styles = {
  root: {
    width: 25 ,
    height: 25,
  },
  button: {
    width: 25 ,
    height: 25,
  },
  bomb: {
    width: 12 ,
    height: 12,
  },
  buttonPressed: {
    
  },
  buttonPressedWithBomb: {
    width: 25 ,
    height: 25,
    backgroundColor: 'red'
  }
}

const bombImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB3aWR0aD0iMTc5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTcxIDU4OXEtMTAtMjUtMzQtMzV0LTQ5IDBxLTEwOCA0NC0xOTEgMTI3dC0xMjcgMTkxcS0xMCAyNSAwIDQ5dDM1IDM0cTEzIDUgMjQgNSA0MiAwIDYwLTQwIDM0LTg0IDk4LjUtMTQ4LjV0MTQ4LjUtOTguNXEyNS0xMSAzNS0zNXQwLTQ5em05NDItMzU2bDQ2IDQ2LTI0NCAyNDMgNjggNjhxMTkgMTkgMTkgNDUuNXQtMTkgNDUuNWwtNjQgNjRxODkgMTYxIDg5IDM0MyAwIDE0My01NS41IDI3My41dC0xNTAgMjI1LTIyNSAxNTAtMjczLjUgNTUuNS0yNzMuNS01NS41LTIyNS0xNTAtMTUwLTIyNS01NS41LTI3My41IDU1LjUtMjczLjUgMTUwLTIyNSAyMjUtMTUwIDI3My41LTU1LjVxMTgyIDAgMzQzIDg5bDY0LTY0cTE5LTE5IDQ1LjUtMTl0NDUuNSAxOWw2OCA2OHptOC01NnEtMTAgMTAtMjIgMTAtMTMgMC0yMy0xMGwtOTEtOTBxLTktMTAtOS0yM3Q5LTIzcTEwLTkgMjMtOXQyMyA5bDkwIDkxcTEwIDkgMTAgMjIuNXQtMTAgMjIuNXptMjMwIDIzMHEtMTEgOS0yMyA5dC0yMy05bC05MC05MXEtMTAtOS0xMC0yMi41dDEwLTIyLjVxOS0xMCAyMi41LTEwdDIyLjUgMTBsOTEgOTBxOSAxMCA5IDIzdC05IDIzem00MS0xODNxMCAxNC05IDIzdC0yMyA5aC05NnEtMTQgMC0yMy05dC05LTIzIDktMjMgMjMtOWg5NnExNCAwIDIzIDl0OSAyM3ptLTE5Mi0xOTJ2OTZxMCAxNC05IDIzdC0yMyA5LTIzLTktOS0yM3YtOTZxMC0xNCA5LTIzdDIzLTkgMjMgOSA5IDIzem0xNTEgNTVsLTkxIDkwcS0xMCAxMC0yMiAxMC0xMyAwLTIzLTEwLTEwLTktMTAtMjIuNXQxMC0yMi41bDkwLTkxcTEwLTkgMjMtOXQyMyA5cTkgMTAgOSAyM3QtOSAyM3oiLz48L3N2Zz4="

export class Cell extends Component {
  constructor(props){
    super(props)

    this.state = {
      reveled: false,
      display: null
    }

    this.revealCell = this.revealCell.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.BOMB = this.BOMB.bind(this)

  }

  revealCell(event){
    event.preventDefault()
    console.log(event);
    const {value} = this.props
    if(event.nativeEvent.which === 1){
      console.log("clicky clicky")
      if (value === -1){
        this.BOMB();
      }
      this.setState({ display: value})
    } else if (event.nativeEvent.which === 3) {
      console.log('Right click');
    } else {
      console.log('que')
    }
  }

  BOMB(){
    this.props.itsABomb();
  }

  defineColor(display){
    let color
    switch(display){
      case 1: {
        color = '#6323F3'
        break;
      }
      case 2: {
        color = '#2C9A2C'
        break;
      }
      case 3: {
        color = '#FF0000'
        break;
      }
      case 4: {
        color = '#472990'
        break;
      }
      case 5: {
        color = '#A65F5F'
        break;
      }
      default: {
        color = 'white'
        break;
      }
    }
    return color
  }

  renderButton(){
    const {display} = this.state
    const {disabled} = this.props
    if (display === -1) {
      return (
        <button style={styles.buttonPressedWithBomb} onClick={this.revealCell} >
          <img src={bombImage} style={styles.bomb} />
        </button>
      )
    } else if (display !== null && display !== -1) {
      let color = this.defineColor(display)
      let buttonStyle = {
        width: 25 ,
        height: 25,
        backgroundColor: 'white',
        color
      }
      return (
        <button style={buttonStyle} onClick={this.revealCell}>
          {display === 0 ? " " : display}
        </button>
      )      
    } else {
      return (
        <button disabled={disabled} style={styles.button} onClick={this.revealCell} >
          {" "}
        </button>
      )
    }
  }

  render() {
    const {display} = this.state
    return (
      <div styles={styles.root}>
        {this.renderButton()}
      </div>
    )
  }
}

export default Cell
