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
    width: 53%;
    padding-top: 29.75%; // 9/16 * 60%
    position: absolute;
    display: ${props => props.show ? "inline-block" : "none"};
    top: 0px;
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
    width: 53%;
    padding-top: 0.75%; // 9/16 * 60%
    position: absolute;
    display: ${props => props.show ? "inline-block" : "none"};
    top: 437px;
    right: 20px;
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
        top: 426px;
        padding-top:00px;
        position:relative;
    }    
        
    @media only screen and (max-width: 768px) {
        width: 100vw;
        height: 43vh;
        right: 0px;
        top: 426px;
        padding-top:00px;
        position:relative;
    }
    @media only screen and (min-width: 1400px) {
       top: 515px;
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
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 64.5%; // 9/16 * .40
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
    grid-template-rows: 1fr 1fr 2fr;
    grid-gap: 10px;
}
    @media only screen and (max-width: 768px) {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-rows: 1fr 1fr 2fr; 
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