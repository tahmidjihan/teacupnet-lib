import dataController from './Controllers/data.controller.js';
import analytics from './Analytics/analytics.controller.js';

export const initial = {
  clientID: '',
  clientKey: '',
};

function init(clientID, clientKey) {
  if (!clientID || !clientKey) {
    return {
      error: 'Invalid Credentials',
      message: 'Please provide clientID and clientKey',
    };
  }
  initial.clientID = clientID;
  initial.clientKey = clientKey;
  return {
    data: dataController,
    analytics: analytics,
  };
}

export default init;
