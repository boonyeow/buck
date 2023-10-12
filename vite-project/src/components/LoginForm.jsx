import { useFormik } from "formik";
import * as Yup from "yup";
import supabase from "../supabaseClient";
import { useState } from "react";
const LoginForm = () => {
  const [loginError, setLoginError] = useState(null);
  const handleLogin = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      console.log("error", error);
      setLoginError(error);
      return;
    }

    if (data) {
      console.log("data", data);
      data.session.setLoginError(null);
      supabase.auth.setSession(data.session);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: handleLogin,
  });
  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>

      {loginError && <p>{JSON.stringify(loginError)}</p>}
    </>
  );
};

export default LoginForm;
