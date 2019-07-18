import React, { Component } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import { compose, withState } from 'recompose'
import CardContainer from './CardContainer'
import { BASE_URL } from '../services/api'

const SearchContainer = styled.div`
  font-size: 40px;
  text-align: center;
  padding-top: 12px;
`

const Search = styled.input`
  height: 50px;
  width: 90%;
  z-index: 3;
  font-size: 24px;
  padding: 8px;
`

const ListItem = styled.div`
  max-height: 630px;
  overflow-y: scroll;
  margin-top: 5px;
`

const LabelNotFount = styled.div`
  margin-top: 100px;
`

const filterPokemon = (setAllData, listData) => (e) => {
  const text = e.target.value
  fetch(`${BASE_URL}?limit=20&name=${text}`)
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    const cards = json.cards
    const filterCode = R.map(res => res.id)(listData)
    const test = R.filter(res => !R.contains(res.id, filterCode))(cards)
    setAllData(test)
  })
}

class SearchInput extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }
  async componentDidMount() {
    const { listData, setAllData } = this.props
    const response = await fetch(`${BASE_URL}?limit=20`)
    const json = await response.json()
    const filterCode = R.map(res => res.id)(listData)
    const test = R.filter(res => !R.contains(res.id, filterCode))(json.cards)
    setAllData(test)
  }
  render() {
    const { allData, setAllData, setListData, listData } = this.props
    return (
      <SearchContainer>
        <Search type="text" name="search" placeholder="Find Pokemon" onChange={filterPokemon(setAllData, listData, setListData)}/>
        {
          !R.isEmpty(allData)
            ? <ListItem>
                <CardContainer data={allData} setListData={setListData} listData={listData} allData={allData} setAllData={setAllData}/>
              </ListItem>
            : <LabelNotFount>ไม่พบข้อมูลที่ค้นหา</LabelNotFount>
        }
      </SearchContainer>
    )
  }
}

export default compose(
  withState('allData', 'setAllData', []),
)(SearchInput)
