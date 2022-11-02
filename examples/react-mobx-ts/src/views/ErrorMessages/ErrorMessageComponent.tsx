import React from "react";
import { Alert, ClosedButton } from "./ErrorMessageComponent.styled";
import ErrorViewModel from "./ErrorViewModel";
import { observer } from "mobx-react";
import Managers from "../../stores/Managers";

interface Props {
  managers: Managers;
  message: string;
}
interface State {
  alert: boolean;
}
@observer
export default class ErrorMessageComponent extends React.Component<
  Props,
  State
> {
  private errorViewModel: ErrorViewModel;

  constructor(props: Props) {
    super(props);
    this.errorViewModel = new ErrorViewModel(props.managers);
    this.state = {
      alert: true,
    };
  }

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({ alert: false });
      this.errorViewModel.setErrorFlagFalse();
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }
  closedErrorMessage() {
    this.errorViewModel.setErrorFlagFalse();
  }

  render() {
    return (
      <>
        {this.state.alert && (
          <Alert>
            <ClosedButton onClick={() => this.closedErrorMessage()}>
              &times;
            </ClosedButton>
            <strong>Error!</strong><> {this.props.message?.length >0 ? this.props.message : "API Failed" }</>
          </Alert>
        )}
      </>
    );
  }
}
