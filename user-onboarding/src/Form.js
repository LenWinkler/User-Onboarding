import React, {useState} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = () => {
    return (
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="Password" />
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
        }
    }
})(UserForm);




export default FormikUserForm;