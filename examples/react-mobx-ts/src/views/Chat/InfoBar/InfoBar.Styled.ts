import styled from "styled-components";
import { ImCross } from "react-icons/Im";


export const InfoBarMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: start;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 40px;
  width: 100%;
`;


export const LeftInnerContainer = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
  > img {
    margin-right: 5%;
  }

  > p {
    color: #fad4d4;
    font-weight: 700;
    font-size: 20px;
  }
`;

export const RightInnerContainer = styled.div`
  display: flex;
  flex: 0.2;
  justify-content: flex-end;
  margin-right: 5%;
`;
