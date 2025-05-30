import { InferType, object, string } from 'yup';

const validationSchema = object().shape({
  email: string().email('Invalid email address').required('Required'),
  password: string().required('Required'),
});

export type SignInValuesType = InferType<typeof validationSchema>;

export default validationSchema;
