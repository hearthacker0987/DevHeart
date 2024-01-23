import * as Yup from 'yup'

const SubmitBlogSchema = Yup.object({
    title: Yup.string().required(),
    slug: Yup.string().required(),
    img: Yup.string().required(),
    content: Yup.string().required()
});

export default SubmitBlogSchema;