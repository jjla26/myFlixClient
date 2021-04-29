export default function Validation(values){
  const errors = {}
  if(!values.username.trim()){
    errors.username = "Username is required"
  }
  if(!values.email.trim()){
    errors.email = "Email is required"
  }else if(values.email.indexOf('@') === -1){
    errors.email = "Email format is incorrect"
  }
  if(!values.password){
    errors.password = "Password is required"
  }else if(values.password.length <6){
    errors.password = "Password should be longer than 6 characters"
  }
  if(!values.passwordConfirmation){
    errors.passwordConfirmation = "Password Confirmation is required"
  }else if(values.passwordConfirmation !== values.password){
    errors.passwordConfirmation = "Password Confirmation should be equal to Password"
  } 
  if(!values.birthday){
    errors.birthday = "Birthday is required"
  }
  return errors
}