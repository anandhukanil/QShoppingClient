import React, { Component, PropsWithChildren, useState } from "react";
import ErrorPage from "./ErrorPage";
import { error } from "../assets";
import styles from "./styles.module.css";

class ErrorBoundary extends Component<IProps, IState> {
  state = { error: undefined, errorPath: undefined };

  static getDerivedStateFromError (_error: Error) {
    return { error: _error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({ errorPath: errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPage
          image={error}
          title=" Oops, Something Went Wrong!"
          description="We're sorry, but it looks like there was an error processing your request. Please try again later."
          Component={() => <ErrorDetails errorData={this.state} />}
          removePaddingOnFullPage
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

interface IProps extends PropsWithChildren {}
interface IState {
  error: Error|undefined;
  errorPath: React.ErrorInfo|undefined;
}

const ErrorDetails: React.FC<{ errorData: IState }> = ({errorData}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const onButtonClick = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <div>
      <button className={styles.showErrorDetailsButton} onClick={onButtonClick}>Show Details</button>
      {showDetails && (
        <div className={styles.errorDetailsWrapper}>
          <pre>
            <code>
              {errorData?.error?.name}: {errorData?.error?.message}
              <br />
              {errorData?.errorPath?.componentStack}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};