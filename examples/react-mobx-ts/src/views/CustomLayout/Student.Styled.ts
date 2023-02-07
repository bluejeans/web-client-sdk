
import styled from 'styled-components';
export const DEFAULT_BORDER = `solid 1px black`

const getInitialsDimentions = (isParticipantOnMainStage, props) => {
    let height = isParticipantOnMainStage ? 33.3 : 50;
    return {
        height: height + "%",
        width: 9 / 16 * height + "%",
        fontSize: height / 2 + "%"
    }
}

export const AudioContainer: any = styled<any, any>("div")`
    position: relative;
    z-index: 2;
    background: ${props => props.background};
    aspect-ratio: 16 / 9;
    width: 24%;
    top: 0px;
    text-align: ${props => (props.isFilmStrip) ? "left" : "center"};
    border: ${DEFAULT_BORDER};
    &:hover{
        cursor: ${props => props.enableThumbnailClick ? "pointer" : "auto"};
    };
    &:before {
        z-index: 6;
        content: '';
        display: ${props => props.displayBorder ? "block" : "none"};
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        border: ${DEFAULT_BORDER};
    }
`;


export const ParticipantInitials: any = styled<any, any>("div")`
    position: absolute;
    color: #4a4a4a;
    text-transform: uppercase;
    border-radius: 50%;
    height: ${props => getInitialsDimentions(props.isParticipantOnMainStage, props).height};
    width: ${props => getInitialsDimentions(props.isParticipantOnMainStage, props).width};
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #e3eaef;
    vertical-align: middle;
    font-size: calc(1vw * 1.60);
    line-height: 250%;
    margin: 0.5%
    @media only screen and (max-width: 1100px) {
        font-size: calc(2vw * 1.72);
        line-height: 200%;
        }
`

export const StreamInformation: any = styled<any, any>("div")`
    position: absolute;
    bottom: ${props => props.isParticipantOnMainStage ? "" : "0"};
    top:${props => props.isParticipantOnMainStage ? "70px" : ""};
    left: ${props => props.isParticipantOnMainStage ? "17px" : "0px"};
    z-index: 5;
    width: ${props => props.isParticipantOnMainStage ? "177px" : "100%"};
    width: 98%;
    padding: 0% 1%;
    //TODO: Need to remove the default values for CSS rules where css min() has been used in this file after electron version is upgraded to > 79
    font-size: 12px;
    // font-size: min(calc(${props => "100%"}*0.2 - 2px), 12px);
    font-family: ${/*props => props.theme.fonts.ProximaNovaRegular*/ null};
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.7);
    text-align: left;
    align-items: center;
    // padding: "0px 4px";
    min-height: "18px";
    max-height: "18px";
    display: inline-grid;
    column-gap: "4px";
    border-top: none;
     /* //TODO: Need to remove the default values for CSS rules where css min() has been used in this file after electron version is upgraded to > 79 */;
    ${props => {
        let defaultStyles = /* __TODO__ PlatFormValues.isDesktopApp*/ false ? (props.isParticipantOnMainStage && props.isBlur ? `grid-template-columns: auto 12px 12px` : `grid-template-columns: auto 12px`) : `grid-template-columns: auto min(12%, 18px)`;
        if(props.isShowCallQuality){
            defaultStyles = defaultStyles + ` 12px`;
        }
        if (props.shouldShowLowerThird) {
            const rowStyle = `min(12%, 18px) min(12%, 20px)`;
            return `
           grid-template-columns: ${rowStyle};
           margin-left: 90%;
           padding-left: 6px;
           border-top-left-radius: 6px;
        `
        }
        return defaultStyles;
    }};
`;

export const EndpointName: any = styled<any, any>("div")`
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    margin-left: 1%;
`