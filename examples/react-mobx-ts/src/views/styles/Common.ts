import styled from 'styled-components';

export const TextBox = styled.input`
    width: 200px;
    margin: 8px;
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
export const VideoHolder = styled<any, any>("div")`
    width: 60%;
    padding-top: 33.75%; // 9/16 * 60%
    position: absolute;
    display: ${props => props.show ? "inline-block" : "none"};
    top: 50px;
    right: 20px;
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

    @media only screen and (max-width: 768px) {
        width: 100vw;
        height: 50vh;
        right: 0px;
        top: 0px;
        padding-top:0px;
    }
`

export const SharedScreenHolder = styled<any, any>("div")`
    width: 60%;
    padding-top: 33.75%; // 9/16 * 60%
    position: absolute;
    display: ${props => props.show ? "inline-block" : "none"};
    top: 538px;
    right: 20px;
    background-color: rgb(149, 216, 252);

    .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        }
        
    @media only screen and (max-width: 768px) {
        width: 100vw;
        height: 38vh;
        right: 8px;
        top: 441px;
        padding-top:00px;
        position:relative;
    }
    @media only screen and (min-width: 1400px) {
       top: 633px;
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

export const LocalVideoHolder = styled.div`
    position: absolute;
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

export const RemoteContentHolder = styled<any, any>("div")`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 52.5%; // 9/16 * .40
    display: ${props => props.show ? "inline-block" : "none"};
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
    color: rgb(149, 216, 252);


    @media only screen and (max-width: 768px) {
        position: initial;
        transform: none;
    }
`

export const Container = styled.div`
    @media only screen and (max-width: 768px) {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-rows: 1fr 1fr;
        grid-gap: 10px;
    }
`