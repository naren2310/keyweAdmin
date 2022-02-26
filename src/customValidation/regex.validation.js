var validateEmail = (email) =>{
    var regxExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regxExp.test(email)
};

var validatepassword = (value,regxExp) => {
    if (value.length < 8) {
      return regxExp.message('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return regxExp.message('password must contain at least 1 letter and 1 number');
    }
    return value;
  };


  module.exports = {
    validateEmail,
    validatepassword
  }