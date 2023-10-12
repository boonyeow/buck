import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
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
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          {...formik.getFieldProps("firstName")}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          {...formik.getFieldProps("lastName")}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

const MultipleFileUploadForm = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    // Store the selected files in the state
    setFiles([...e.target.files]);
  };

  const handleUpload = async (file) => {
    const url =
      "https://69bswmje38.execute-api.us-east-1.amazonaws.com/default/upload_file";
    fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        key: file.name,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        fetch(response.uploadURL, {
          method: "PUT",
          mode: "cors",
          body: file,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    files.map((file) => {
      handleUpload(file);
    });
  };
  return (
    <div>
      <form action="" encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <input
          type="file"
          name="files"
          multiple="multiple"
          onChange={handleFileChange}
        />
        <input type="submit" value="upload" />
      </form>
    </div>
  );
};
const HomePage = () => {
  return (
    <div>
      <Link to="/supabase">supabase</Link>
      <div>
        <h1>signup form</h1>
        <SignupForm />
      </div>
      <div>
        <h1>multiple files upload</h1>
        <MultipleFileUploadForm />
      </div>
    </div>
  );
};

export default HomePage;
