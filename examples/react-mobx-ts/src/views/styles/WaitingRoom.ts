import styled from 'styled-components';
import { TextBox } from './Common';

export const WaitingContainer = styled.div`
    position: absolute;
    display:flex;
    flex-direction: column;
    top:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgb(149, 216, 252);
    color:white;
    font-size: 50px;
`

export const Button = styled.button`
    width: 180px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    background: black;
    color: white;
    font-size: 14px;
    font-weight: bolder;
    cursor: pointer;
`
export const PreviewHolder = styled.div`
    /* position: absolute; */
    position: relative;
    width: 50%;
    height: 50%;
    bottom: 10%;
    right:3%;
    `;


export const ToggleButton = styled(Button)`
/* position: absolute; */
    right: 3%;
    top: 61%;
`;

export const LocalVideoHolderTest = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    /* padding-top: 11.25%; // 9/16 * .20 */
    z-index: 2;
    border:1px solid grey;

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
    }
`;


