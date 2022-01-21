import styled from "styled-components";

export const InputContainer: any = styled.div`
  display: flex;
  border-top: 2px solid #d3d3d3;

  > input {
    border: none;
    border-radius: 0;
    padding: 2%;
    width: 80%;
    font-size: 1em;
  }
  > input:focus {
    outline: none;
  }
  > button {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #2979ff;
    display: inline-block;
    border: none;
    width: 20%;
  }
`;
