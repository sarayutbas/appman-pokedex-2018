import React from 'react'
import styled from 'styled-components'
import SearchInput from './SearchInput'
import { compose, withState } from 'recompose'

const Footer = styled.div`
  height: 78px;
  background-color: #ec5656;
`

const IconCenter = styled.div`
  width: 146px;
  height: 146px;
  background-color: #ec5656;
  border-radius: 50%;
  bottom: 0;
  left: 42%;
  position: absolute;
`

export const ModalOverlay = styled.div`
  background-color: black;
  opacity: 0.7;
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 0;
  bottom: 0;
`

const Popup = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 90%;
  z-index: 2;
  height: 95%;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%,-50%);
`

const Text = styled.label`
  font-size: 100px;
  color: white;
  margin-left: 34%;
`

const FooterContainer = ({ openModal, setOpenModal, listData, setListData }) => {
  return (
    <React.Fragment>
      {
        openModal &&
          <React.Fragment>
            <Popup>
              <SearchInput listData={listData} setListData={setListData} />
            </Popup>
            <ModalOverlay onClick={() => setOpenModal(false)} />
          </React.Fragment>

        }
      <IconCenter onClick={() => setOpenModal(true)}>
        <Text>+</Text>
      </IconCenter>
      <Footer />
    </React.Fragment>
)}

export default compose(
  withState('openModal', 'setOpenModal', false),
)(FooterContainer)
