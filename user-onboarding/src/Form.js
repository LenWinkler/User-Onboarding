import React, {useState} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { string } from "postcss-selector-parser";

const UserForm = ({values, errors, touched, status}) => {
    return (
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
                <p>{errors.name}</p>
            )}

            <Field type="email" name="email" placeholder="Email" />
            {touched.email && errors.email && (
                <p>{errors.email}</p>
            )}    

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (
                <p>{errors.password}</p>
            )}    

            <label>Terms of Service
                <Field type="checkbox" name="terms" />
            </label>
            <button type="submit">Submit</button>
        </Form>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues ({ name , email, password}) {
        return {
        name: name || "",
        email: email || "",
        password: password || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required").max(15, "Name must be 15 characters or less"),
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string().required("Password is required").min(4, "Password must be between 4-8 characters").max(8, "Password must be between 4-8 characters")
    })
})(UserForm);




export default FormikUserForm;