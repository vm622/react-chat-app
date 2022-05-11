export const endpoint = "http://192.168.0.125:5000";
export const registerRoute = `${endpoint}/users/register/`;
export const loginRoute = `${endpoint}/users/login/`;
export const getAllUsersRoute = `${endpoint}/users/`;
export const getUserChatroomsRoute = `${endpoint}/rooms/`;
export const getChatroomConverstionRoute = `${endpoint}/rooms/chat/`;  // + ${:roomId}
export const postMessageRoute = `${endpoint}/rooms/message/`;  // + ${:roomId}
export const createChatroomRoute = `${endpoint}/rooms/create/`;
export const joinChatroomRoute = `${endpoint}/rooms/join/`;  // + ${:roomId} + ${:userId}
export const leaveChatroomRoute = `${endpoint}/rooms/leave/`;  // + ${:roomId} + ${:userId}
export const deleteChatroomRoute = `${endpoint}/rooms/`;  // + ${:roomId}
export const deleteMessageRoute = `${endpoint}/rooms/message/`;  // + ${:messageId}
