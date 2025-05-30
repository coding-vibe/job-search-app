import { Formik, FormikConfig } from "formik";
import authAPIClient from "@/api/authAPI";
import validationSchema, {
  CreateProfileValuesType,
} from "@/components/CreateProfileForm/validationSchema";
import InputField from "@/components/InputField";
import routes from "@/constants/routes";
import localStorageKeys from "@/constants/localStorageKeys";
import useLogin from "@/hooks/useLogin";

export default function CreateProfileForm() {
  const handleLogin = useLogin(routes.JOBS);

  const handleSubmit: FormikConfig<CreateProfileValuesType>["onSubmit"] =
    async (values) => {
      const { email, password } = values;

      const { data } = await authAPIClient.post("/users", values);

      localStorage.setItem(localStorageKeys.USER_PROFILE, JSON.stringify(data));

      await handleLogin({ email, password });
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-16">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-800 bg-gray-900/50 p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">
            Create Profile
          </h1>
          <p className="mt-3 text-base text-gray-400">
            Fill in your details to get started
          </p>
        </div>

        <Formik<CreateProfileValuesType>
          initialValues={{
            email: "",
            password: "",
            name: "",
            jobTitle: "",
            aboutMe: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-5">
                <InputField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.name}
                  touched={touched.name}
                  required
                />

                <InputField
                  label="Job Title"
                  name="jobTitle"
                  type="text"
                  placeholder="Enter your job title"
                  value={values.jobTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.jobTitle}
                  touched={touched.jobTitle}
                  required
                />

                <div className="space-y-2">
                  <label
                    htmlFor="aboutMe"
                    className="block text-sm font-medium text-gray-200"
                  >
                    About Me
                  </label>
                  <div className="relative">
                    <textarea
                      id="aboutMe"
                      name="aboutMe"
                      rows={4}
                      className="w-full rounded-lg border border-gray-700/50 bg-gray-800/90 px-4 py-3 text-base text-white
                        placeholder:text-gray-500 transition-all duration-200
                        hover:border-gray-600
                        focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                      placeholder="Tell us about yourself"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.aboutMe}
                    />
                  </div>
                  {errors.aboutMe && touched.aboutMe && (
                    <p className="mt-1.5 text-sm font-medium text-red-400">
                      {errors.aboutMe}
                    </p>
                  )}
                </div>

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.email}
                  touched={touched.email}
                  required
                  autoComplete="email"
                />

                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.password}
                  touched={touched.password}
                  required
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full rounded-lg bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white
                  shadow-sm transition-all duration-200
                  hover:bg-blue-600 hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                  disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500"
              >
                {isSubmitting ? "Creating Profile..." : "Create Profile"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
