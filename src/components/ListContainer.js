import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import {
  AddOrRemoveButton,
  TdButton,
} from './CardUi'
import { calculateData, Cards } from './CardContainer'

const List = styled.div`
  height: 600px;
  overflow-y: scroll;
`

export const Table = styled.table`
  width: 100%;
  background-color: #f3f4f7;
  border: 1px solid #d5d6dc;
  position: relative;
  display: inline-block;
  width: 47%;
  height: 240px;
  margin: 10px;
`

const removeData = (res, setListData, listData) => {
  const newData = R.filter(response => {
    return response.id !== res.id
  })(listData)
  setListData(newData)
}

const ListContainer = ({ listData, setListData }) => (
  <List>
    {
      listData.map(res => {
        const value = calculateData(res)
        return (
          <Table key={res.id}>
            <tbody>
              <tr>
                {Cards(res, value, 1, 150)}
                <TdButton>
                  <AddOrRemoveButton onClick={() => removeData(res, setListData, listData)}>
                    X
                  </AddOrRemoveButton>
                </TdButton>
              </tr>
            </tbody>
          </Table>
        )
      })
    }
  </List>
)

export default ListContainer
