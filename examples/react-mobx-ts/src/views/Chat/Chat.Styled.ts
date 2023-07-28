import styled from 'styled-components'

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #1a1a1d;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  height: 70vh;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 480px) and (max-width: 1200px) {
    width: 100%;
  }
`
