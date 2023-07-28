import styled from 'styled-components'

export const ParticipantListContainer = styled.div`
  background-color: white;
  height: 180px;
  overflow: auto;
  > h3 {
    margin-top: 15px;
    text-align: center;
    color: gray;
    font-size: 18px;
  }
  > hr {
    width: 100%;
    margin-bottom: -2px;
  }
`

export const ParticipantListItem = styled.div``

export const ParticipantName = styled.div`
  display: inline-block;
  padding: 7px 0px 7px 17px;
  font-size: 17px;
  font-style: italic;
  font-color: gray;
  border-bottom: 1px solid gray;
  width: 96%;

  &:hover {
    font-size: 20px;
    background: #f6f6f6;
  }

  > span {
    position: relative;
    top: -6px;
    right: 0px;
    padding: 0px 6px;
    border-radius: 50%;
    background-color: red;
    color: white;
  }
`
