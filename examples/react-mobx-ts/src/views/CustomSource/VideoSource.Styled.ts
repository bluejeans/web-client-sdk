import styled from "styled-components";
import { Button } from "../Common/styles/Common";

export const WebButton = styled.button`
  font-size: 13px;
  background-color:#dcdcde;
  color:gray;
`
export const SourceRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
`;

export const UploadRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
`;

export const UploadButton = styled.label`
  width: 180px;
  display: block;
  margin: 10px auto;
  border-radius: 4px;
  background-color: #4674AD;
  color: white;
  border: 0;
  height: 30px;
  cursor: pointer;
  text-align: center;
  font-size: 13px;
  :hover {
    background-color: #4B7DBA;
  }
}
`;
export const ChooseFile = styled.p`
 margin-top: 7px;
`;


export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  aspect-ratio: 19 / 10;
  padding: 3px;
`;

export const Canvas = styled.canvas`
  width: 350;
  height: 200;
`
