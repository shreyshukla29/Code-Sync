/* eslint-disable no-unused-vars */

const ACTIVITY_STATE = {
    CODING: "coding",
    DRAWING: "drawing",
};

const AppContext = {
    users: [],
    setUsers: function (users) {},
    currentUser: null,
    setCurrentUser: function (user) {},
    status: null,
    setStatus: function (status) {},
    activityState: null,
    setActivityState: function (state) {},
    drawingData: null,
    setDrawingData: function (data) {},
};

export { ACTIVITY_STATE };
export { AppContext };
