import React, {useRef} from "react";
import { observer } from 'mobx-react';
import Managers from "../../stores/Managers";
import { CustomContainerDiv, Random} from "./CustomLayout.Styled";
import CustomLayoutViewModel from "./CustomLayoutViewModel";
import Thumbnail from "./Thumbnail"
import MainStage from "./MainStage"



interface Props {
  managers : Managers;
}
interface State {
  randomColur : boolean;
}

@observer 
class CustomLayout extends React.Component<Props,State> {
  obj: { name: string; }[];
  private customLayoutViewModel : CustomLayoutViewModel;
  
  constructor(props: Props) {
    super(props);
    this.customLayoutViewModel = new CustomLayoutViewModel(props.managers);
    this.state = {
      randomColur: false
    }
  }


  setRandomColour=()=>{
    this.setState({randomColur: !this.state.randomColur})
  }

  render() {
    return (
      <CustomContainerDiv>
        {/* [TODO] id needs to be replaced with ref, eg: Check Thumbnail.tsx*/}
       <MainStage id="moderator" participant={this.customLayoutViewModel.firstModerator} managers={this.props.managers} streams={this.customLayoutViewModel.getStreamsForFirstModerator}/>
       <MainStage id="pinnedParticipant" participant={this.customLayoutViewModel.getPinnedParticipantDetails} managers={this.props.managers} streams={this.customLayoutViewModel.streamsForPinnedParticipant}/>
        {this.customLayoutViewModel.alphabeticallySortedParticipants.map(
          (obj, index) => {
            return (
              <Thumbnail
                participant={obj}
                // index={index}
                key={obj.participantGuid}
                random={this.state.randomColur}
                managers={this.props.managers}
                streams={this.customLayoutViewModel.videoStreamsMap.get(obj.participantGuid)}
              />
            );
          }
        )}
        <Random onClick={this.setRandomColour}>Randomise</Random>
      </CustomContainerDiv>
    );
  }
}

export default CustomLayout;
