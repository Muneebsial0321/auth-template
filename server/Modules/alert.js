
const alert = (auth,alert,sev,msg) => {
  return {
    "auth":auth, //for setting auth as false will protect the frontend routes 
    "open":alert, // this set the display of alerts to be true often use full when user is not authenticated and you need to show alert to user that a login is required to view protected . Also useful when a record is not found   
    "sev":sev, //to set alert theme for success,warning,error
    "msg":msg // to set the alert message
  }

}

module.exports = alert