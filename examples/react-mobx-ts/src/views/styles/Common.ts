import styled from 'styled-components';

export const buttonColor = '#4674AD'
export const hoveredButtonColor = '#4B7DBA'
export const disabledButtonColor = '#385E8C'
export const unselectedButtonColor = '#CFCFD1'
export const backgroundColor = '#2A5994' // see also index.js

export const Button = styled<any,any>("button")`
    width: 180px;
    display: block;
    margin: 8px auto;
    border-radius: 4px;
    background-color: ${buttonColor};
    color: white;
    border: 0;
    height: 30px;
    cursor: ${props => props.disabled ? "default" : "pointer"};
    opacity: ${props => props.disabled ? "0.5" : "1"};
    :hover {
        background-color: ${props => props.disabled ? disabledButtonColor : hoveredButtonColor };
    }
`

export const TextBox = styled.input`
    width: 200px;
    padding: 8px;
    border-radius: 4px;
`
export const TextBoxEmail = styled.input`
    width: 200px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
`
export const TextArea = styled.textarea`
    width: 200px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
`
export const ErrorMsg = styled.p`
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    font-size: 12px;
    color:red;
`
export const LogUploadMsg = styled.p`
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
`
export const RightContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    margin-top: 20px;

    @media only screen and (max-width: 1100px) {
    width: 100%;
    position:relative;
    }
`
export const VideoHolder = styled<any, any>("div")`
    width: 100%;
    padding-top: 57.75%; // 9/16 * 60%
    position: relative;
    display: ${props => props.show ? "inline-block" : "none"};
    top: 0px;
    right: 0px;
    background-color: black;

    .remoteVideo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;

        .video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
        }
    }
    @media only screen and (max-width: 1100px) {
        width: 100vw;
        height: 43vh;
        right: -8px;
        top: 0px;
        padding-top:0px;
    }
    @media only screen and (max-width: 768px) {
        width: 100vw;
        height: 43vh;
        right: -8px;
        top: 0px;
        padding-top:0px;
    }
`

export const SharedScreenHolder = styled<any, any>("div")`
    width: 100%;
    padding-top: 0.75%; // 9/16 * 60%
    position: relative;
    display: ${props => props.show ? "inline-block" : "none"};
    background-color: rgb(149, 216, 252);

    .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        clear:both;
        }

    @media only screen and (max-width: 1100px) {
        width: 100vw;
        height: 43vh;
        right: 0px;
        padding-top:00px;
        position:relative;
    }
`
export const VideoMessage = styled<any,any>("div")`
    width: 100%;
    text-align: center;
    font-size: 20px;
    top: 45%;
    color: white;
    position: absolute;
    z-index: 3;
`;

export const NoContentShared = styled<any,any>("div")`
    text-align: center;
    font-size: 20px;
    color: white;
    position: relative;
    top: 100px;
    @media only screen and (max-width: 1100px) {
        top: 0;
    }
`;

export const LocalVideoHolder = styled<any, any>("div")`
    position: absolute;
    display: ${props => props.show ? "inline-block" : "none"};
    top: 0;
    right: 0;
    width: 20%;
    padding-top: 11.25%; // 9/16 * .20
    z-index: 2;

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
    }
`;


export const JoiningMessage = styled.div`
    width: 300px;
    text-align: center;
    margin-top: 250px;
    font-size: 26px;
    font-style: italic;
    white-space: pre-wrap;

    @media only screen and (max-width: 768px) {
        width: 100vw;
        position: absolute;
        top: 55vh;
        display: flex;
        justify-content: center;
    }
`

export const BuildInfo = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: black;

    @media only screen and (max-width: 1100px) {
        position: initial;
        transform: none;
    }

    @media only screen and (max-width: 768px) {
        position: initial;
        transform: none;
    }
`

export const Container = styled.div`
@media only screen and (max-width: 1100px) {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: auto;
    grid-gap: 10px;
}
    @media only screen and (max-width: 768px) {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-rows: auto;
        grid-gap: 10px;
    }
`

export const CaptionTextContainer:any = styled.div`
    position: absolute;
    z-index: 10;
    bottom: 45px;
    width: fit-content;
    max-width: 80%;
    left: 50%;
    transform: translateX(-50%);
    text-align: left;
`;
export const CaptionTextSpan:any = styled.span`
    background-color: black;
    color: white;
    font-size: 16px;
`