import React from "react";
import { Formik } from "formik";
import InputField from "@/components/InputField";
import routes from "@/constants/routes";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import validationSchema, {
  SignInValuesType,
} from "@/components/SignInForm/validationSchema";

export default function SignForm() {
  const handleLogin = useLogin(routes.JOBS);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
            Sign In
          </h1>
          <p className="mt-3 text-base text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <Formik<SignInValuesType>
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              aria-label="Sign in form"
              noValidate
            >
              <div
                className="space-y-5"
                role="group"
                aria-label="Sign in credentials"
              >
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
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.password}
                  touched={touched.password}
                  required
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                aria-busy={isSubmitting}
              >
                <span
                  aria-hidden="true"
                  className={isSubmitting ? "hidden" : undefined}
                >
                  Sign In
                </span>
                <span className={!isSubmitting ? "hidden" : undefined}>
                  Signing in...
                </span>
              </button>
            </form>
          )}
        </Formik>
        <div className="text-center">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href={routes.CREATE_PROFILE}
              className="font-medium text-blue-500 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
            >
              Create profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
