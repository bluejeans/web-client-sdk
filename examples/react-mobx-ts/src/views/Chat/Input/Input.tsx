import React from "react";
import { observer } from "mobx-react";
import { InputContainer } from "./Input.Styled";
import InputViewModel from "./InputViewModel";
import { IoMdSend } from "react-icons/Io";
import Managers from "../../../stores/Managers";

interface InputProps {
  managers : Managers;
}
@observer
class Input extends React.Component<InputProps> {
  private inputViewModel : InputViewModel;

  constructor(props: InputProps) {
    super(props);
    this.inputViewModel = new InputViewModel(props.managers);
  }

  sendMessageHandle = (e) => {
    this.inputViewModel.sendMessage(e);
  };

  render() {
    return (
      <InputContainer>
        <input
          type="text"
          placeholder="Type a message..."
          value={this.inputViewModel.message}
          onChange={({ target: { value } }) =>
            this.inputViewModel.setMessage(value)
          }
          onKeyPress={(event) =>
            event.key === "Enter" ? this.sendMessageHandle(event) : null
          }
        />
        <button disabled={!this.inputViewModel.isChatEnabled} onClick={(event) => this.sendMessageHandle(event)}>
          <IoMdSend style={{ fontSize: "24px" }} />
        </button>
      </InputContainer>
    );
  }
}

export default Input;
