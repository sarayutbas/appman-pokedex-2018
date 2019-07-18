import React, { Component } from 'react'
import './App.css'
import ListContainer from './components/ListContainer'
import HeaderContainer from './components/HeaderContainer'
import FooterContainer from './components/FooterContainer'
import { compose, withState } from 'recompose'

export const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  render() {
    const { listData, setListData } = this.props
    return (
      <div className="App">
        <HeaderContainer />
        <ListContainer listData={listData} setListData={setListData}/>
        <FooterContainer listData={listData} setListData={setListData}/>
      </div>
    )
  }
}

export default compose(
  withState('listData', 'setListData', []),
)(App)
