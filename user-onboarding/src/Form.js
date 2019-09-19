import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])
    return (
        <div className="user-form">
            <Form className="actual-form">
                <Field className="field" type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}

                <Field className="field" type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}    

                <Field className="field" type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}    

                <label className="terms-text">
                    <Field type="checkbox" name="terms" checked={values.terms}/>
                    Terms of Service
                </label>
                <button>Submit</button>
            </Form>
            {users.map( user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul> 
            ))}
        </div>
        
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
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log('uh oh', err))
        
    }
})(UserForm);




export default FormikUserForm;