import * as Yup from 'yup'
const LoginSchema = Yup.object({
    email: Yup.string().email("email should be valid email").required(),
    pass: Yup.string().required("Password is required").min(8,"password must be 8 character long").max(25,"password should not be greater then 25 character"),
});

export default LoginSchema;