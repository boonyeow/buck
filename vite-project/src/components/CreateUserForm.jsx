import { useFormik } from "formik";
import * as Yup from "yup";
import supabase from "../supabaseClient";
import { useState } from "react";
const CreateUserForm = () => {
  const [signupError, setSignupError] = useState(null);
  const handleCreateUser = async (values) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) {
      console.log("error", error);
      setSignupError(error);
      return;
    }

    if (data) {
      console.log("data", data);
      setSignupError(null);
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
    onSubmit: handleCreateUser,
  });
  return (
    <>
      <h1>Sign up</h1>
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

      {signupError && <p>{JSON.stringify(signupError)}</p>}
    </>
  );
};

export default CreateUserForm;
