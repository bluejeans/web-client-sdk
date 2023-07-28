import styled from 'styled-components'

const getInitialsDimentions = (isParticipantOnMainStage, props) => {
  let height = isParticipantOnMainStage ? 33.3 : 50
  return {
    height: height + '%',
    width: (9 / 16) * height + '%',
    fontSize: height / 2 + '%',
  }
}

export const CustomContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  padding-top: 0%; // 9/16 * 60%;
  position: relative;
  background-color: black;

  @media only screen and (max-width: 1100px) {
    width: auto;
    right: 0px;
    padding-top: 00px;
    position: relative;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    right: 0px;
    margin: auto;
  }
`
export const StudentDiv = styled<any, any>('div')`
  background-color: ${(props) => (props.isEmpty ? 'grey' : 'black')};
  width: 24%;
  margin: 0.5%;
  padding: 0px 0;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
  aspect-ratio: 16 / 9;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
`
export const TileDiv = styled.div`
  float: left;
  font-size: 10px;
  position: relative;
  color: black;
  background-color: #f7f7f5;
  text-align: center;
  margin: 1px;
`
export const ParticipantNameDiv = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0px;
    background-color: rgba(23, 3, 2, 0.5);;
    text-align: left;
    >span{
        margin: 6px
        font-size: 14px;
        color:white;
    }
`

export const ModeratorVideo = styled.div`
  width: 49%;
  background: #262625;
  margin: 0.5%;
  padding: 0px 0;
  box-sizing: border-box;
  text-align: center;
  aspect-ratio: 16 / 9;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
`
export const ModeratorAudio = styled.div`
  width: 49%;
  background: #262625;
  margin: 0.5%;
  padding: 0px 0;
  box-sizing: border-box;
  text-align: center;
  aspect-ratio: 16 / 9;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
`

export const TilesContainer = styled.div`
  position: absolute;
`
export const Random = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`

export const ModeratorParticipantInitials: any = styled<any, any>('div')`
  position: absolute;
  color: #4a4a4a;
  text-transform: uppercase;
  border-radius: 50%;
  height: ${(props) =>
    getInitialsDimentions(props.isParticipantOnMainStage, props).height};
  width: ${(props) =>
    getInitialsDimentions(props.isParticipantOnMainStage, props).width};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #e3eaef;
  vertical-align: middle;
  font-size: calc(1vw * 5);
  line-height: 170%;
  margin: 0.5% @media only screen and (max-width: 1100px) {
    font-size: calc(2vw * 3.72);
    line-height: 180%;
  }
`
