import React from 'react'
import * as R from 'ramda'
import {
  TdImg,
  ImgCard,
  TdDetail,
  LabelName,
  Graph,
  LabelHeader,
  LabelDetail,
  BarOrange,
  Bar,
  Table,
  TdButton,
  AddOrRemoveButton,
  Card
} from './CardUi'

const pushData = (res, setListData, listData, setAllData, allData) => {
  const newData = R.append(res, listData)
  setListData(newData)
  const newDataOnSearch = R.filter(response => {
    return res.id !== response.id
  })(allData)
  setAllData(newDataOnSearch)
}

const calHP = (hp) => {
  if (hp > 100) {
    hp = 100
  } else if (hp < 0) {
    hp = 0
  }
  return hp
}

const calDMG = (dmg) => {
  let allDmg = 0
  if (!R.isEmpty(dmg)) {
    R.map(res => {
      allDmg += parseInt(res.damage.match(/\d+/g))
      return res
    })(dmg)
  }
  return allDmg
}

export const calculateData = (res) => {
  const hp = calHP(parseInt(res.hp, 10) || 0)
  const dmg = res.attacks ? calDMG(res.attacks) : 0
  return {
    hp,
    maxHp: 100 - hp,
    dmg,
    maxDmg: 100 - dmg
  }
}

export const Cards = (res, value, defaultValue, maxDefault) => (
  <React.Fragment>
    <TdImg>
      <ImgCard>
        <img src={res.imageUrl} id="myPortrait" style={{ height: '230px', padding: '5px' }}/>
      </ImgCard>
    </TdImg>
    <TdDetail>
      <LabelName>{res.name}</LabelName>
        <Graph>
          <div>
            <LabelHeader style={{ width: `${maxDefault/2}px` }}>HP: </LabelHeader>
            <LabelDetail>
              <BarOrange style={{ width: `${value.hp*defaultValue}px` }} />
              <Bar style={{ width: `${maxDefault}px` }}/>
            </LabelDetail>
          </div>

          <div>
            <LabelHeader style={{ width: `${maxDefault/2}px` }}>STR: </LabelHeader>
            <LabelDetail>
              <BarOrange style={{ width: `${value.dmg*defaultValue}px` }} />
              <Bar style={{ width: `${maxDefault}px` }}/>
            </LabelDetail>
          </div>

          <div>
            <LabelHeader style={{ width: `${maxDefault/2}px` }}>WEAK: </LabelHeader>
            <LabelDetail>
              <BarOrange style={{ width: `${value.dmg*defaultValue}px` }} />
              <Bar style={{ width: `${maxDefault}px` }}/>
            </LabelDetail>
          </div>
        </Graph>
    </TdDetail>
  </React.Fragment>
)

const CardContainer = ({ data, listData, setListData, setAllData, allData }) => {
  return (
  <Card>
    {
      data.map(res=> {
        const value = calculateData(res)
        return (
          <Table key={res.id}>
            <tbody>
              <tr>
                {Cards(res, value, 2, 200)}
                <TdButton>
                  <AddOrRemoveButton onClick={() => pushData(res, setListData, listData, setAllData, allData)}>
                    Add
                  </AddOrRemoveButton>
                </TdButton>
              </tr>
            </tbody>
          </Table>
        )
      })
    }
  </Card>
)}

export default CardContainer
