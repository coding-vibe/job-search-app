import { InferType, object, string } from 'yup';

const validationSchema = object().shape({
  name: string().required('Required'),
  jobTitle: string().required('Required'),
  aboutMe: string().required('Required').min(10, 'Must be at least 10 characters long'),
  email: string().email('Invalid email address').required('Required'),
  password: string().required('Required'),
});

export type CreateProfileValuesType = InferType<typeof validationSchema>;

export default validationSchema;
