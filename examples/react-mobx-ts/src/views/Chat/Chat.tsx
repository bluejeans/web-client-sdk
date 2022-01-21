import React from "react";
import InfoBar from "./InfoBar/InfoBar";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import { observer } from "mobx-react";
import { Container } from "./Chat.Styled";
import Managers from "../../stores/Managers";
import ChatViewModel from "./ChatViewModel"

interface Props {
  managers : Managers;
}

@observer
class Chat extends React.Component<Props> {

  private chatViewModel : ChatViewModel;

  constructor(props: Props) {
    super(props);
    this.chatViewModel = new ChatViewModel(props.managers.chatUIManager);
  }

  componentDidMount() {
    this.chatViewModel.clearChatCount();
  }

  render() {
    return (
      <>
        <Container>
          <InfoBar managers={this.props.managers} />
          <Messages managers={this.props.managers} />
          <Input managers={this.props.managers} />
        </Container>
      </>
    );
  }
}

export default Chat;
