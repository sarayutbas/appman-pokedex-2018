import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  height: 90px;
`

const Label = styled.div`
  font-size: 50px;
  text-align: center;
  padding-top: 12px;
`

const HeaderContainer = () => (
  <Header>
    <Label>My Pokedex</Label>
  </Header>
)

export default HeaderContainer
