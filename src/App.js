import React, { Component } from 'react'

import GameConfig from './GameConfig'
import GameBoard from './GameBoard'

export class App extends Component {
  constructor(){
    super()
    
    this.state = {
      configPhase: true,
      gamePhase: false,
      config: {}
    }

    this.setConfig = this.setConfig.bind(this)

  }

  setConfig(config){
    this.setState({configPhase: false, gamePhase: true, config})
  }

  renderScreen(){
    const {configPhase, gamePhase, config} = this.state
    if (configPhase){
      return  <GameConfig config={this.setConfig} />
    }
    if (gamePhase){
      return <GameBoard config={config} />
    }

  }

  render() {
    return (
      <div>
        {this.renderScreen()}
      </div>
    )
  }
}

export default App