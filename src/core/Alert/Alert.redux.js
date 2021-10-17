const INITIAL_STATE = {
  severity: "",
  message: "",
  active: false,
};

export function AlertReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "OPEN_ALERT": {
      return {
        ...state,
        severity: action.severity,
        message: action.message,
        active: true,
      };
    }
    case "CLOSE_ALERT": {
      return {
        ...state,
        active: false,
      };
    }
    default: {
      return state;
    }
  }
}
