const parseJwt = token => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const getPayloadToken = () => {
  var token = localStorage.token
  if (token) {
    var payload = parseJwt(token)
    var currTime = parseInt((new Date()).getTime() / 1000, 10);

    if (currTime > payload.exp) return null;

    return payload.user
  }
}

export default getPayloadToken;
