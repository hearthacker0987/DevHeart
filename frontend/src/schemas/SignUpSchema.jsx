import * as Yup from 'yup'

const SignUpSchema = Yup.object({
    name: Yup.string().required(),
    username: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    pass: Yup.string().required("password is required").min(8,"password must be 8 character long").max(25,"password should not be greater then 25 character"),
    cpass: Yup.string().required("repeat-password is required").oneOf([Yup.ref('pass'),null],"password does not match")
})

export default SignUpSchema;