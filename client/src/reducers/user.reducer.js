export default function(user = {}, action) {
  var userCopy = {...user};
  if (action.type === 'signUp') {
    userCopy = action.user;
    return userCopy
  } else if (action.type === 'signIn') {
    userCopy = action.user;
    return userCopy
  } else {
    return user
  }
};
