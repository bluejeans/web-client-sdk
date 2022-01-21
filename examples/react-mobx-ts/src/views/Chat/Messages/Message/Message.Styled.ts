import styled from "styled-components";

export const SentTextRight = styled.div`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
  margin-right: 22px;
  margin-bottom: -13px;
  padding-right: 10px;
  justify-content: flex-end;
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 3px;
  justify-content: flex-end;
`;

export const MessageBoxBlue = styled.div`
  background: #c22525;
  border-radius: 6px;
  padding: 3px 15px;
  color: white;
  display: inline-block;
  max-width: 80%;
  background: #2979ff;
  :hover {
    -webkit-transform: scale(1.06);
    -ms-transform: scale(1.06);
    transform: scale(1.06);
    transition: 0.3s ease;
  }
  > p {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 0.8em;
    word-wrap: break-word;
  }
`;

export const SendText = styled.div`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
  margin-left: 22px;
  margin-bottom: -13px;
  padding-left: 10px;
`;

export const MessageContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 3px;
  justify-content: flex-start;
`;

export const MessageBoxGray = styled.div`
  background: #c22525;
  border-radius: 6px;
  padding: 3px 15px;
  color: white;
  display: inline-block;
  max-width: 80%;
  background: #f3f3f3;
  :hover {
    -webkit-transform: scale(1.06);
    -ms-transform: scale(1.06);
    transform: scale(1.06);
    transition: 0.3s ease;
  }
  > p {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 0.8em;
    word-wrap: break-word;
    color: #353535;
  }
`;
