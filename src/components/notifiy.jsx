import React from "react";
import { Alert, Button } from "shards-react";

const Notify = () => {
  let interval = null;
  const [state, setState] = React.useState({
    visible: false,
    countdown: 0,
    timeUntilDismissed: 5,
  });

  const showAlert = () => {
    clearInterval();
    setState({ visible: true, countdown: 0, timeUntilDismissed: 5 });
    interval = setInterval(handleTimeChange, 1000);
  };

  const handleTimeChange = () => {
    if (state.countdown < state.timeUntilDismissed - 1) {
      setState({
        ...state,
        ...{ countdown: state.countdown + 1 },
      });
      return;
    }

    setState({ state, ...{ visible: false } });
    clearInterval();
  };

  const clearInterval = () => {
    clearInterval(interval);
    interval = null;
  };

  return (
    <div>
      <Alert className="mb-3" open={state.visible} theme="success">
        Success! This alert will will be dismissed in{" "}
        {state.timeUntilDismissed - state.countdown} seconds!
      </Alert>
      <Button onClick={showAlert}>Show Alert!</Button>
    </div>
  );
};

export default Notify;
