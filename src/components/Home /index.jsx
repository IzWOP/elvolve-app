import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

//stylesheets
import './index.scss';
//yup schema
const emailSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email()
            .required('Email is required'),
    });


const Home = (props) => {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(emailSchema)
      });
    

    const formFix = (formData) => {
        const cleanData = {
            'email': formData.email,
            'attributes': {
                email: formData.email,
            }
        }
        return cleanData
    }
    const onSubmitEmail = (formData) => {
        // formData.preventDefault()
        const sendData = formFix(formData)
        console.log(sendData);
        let button = document.querySelector('.submit');
       button.classList.add('clicked')
       validate()
       function validate() {
        setTimeout(function () {
         button.classList.remove("clicked");
          button.classList.add("validate");
          callback()
        }, 2250);
        }
        function callback(){
            setTimeout(function () {
                    button.classList.remove("validate");
            }, 2250);
        }

    }
      
    return <div className='billboard'>
        <div className='background'></div>
        <div className='container'>
            <div className='row'>
                <div className='billboard_textbox'>
                    <h1>Coming Soon</h1>
                    <p>
                        Creating experiences for your event<br/> using our wristbands.
                    </p>
                    <form onSubmit={handleSubmit(onSubmitEmail)}>
                        <input
                            className='form-item'
                            name="email"
                            placeholder="Email"
                            {...register("email",{pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"})} /> 
                            {errors.email && <p>{errors.email.message}</p>}
                        <button className='submit' type="submit" value="Submitt"></button>
                    </form>
                </div>
            </div>
        </div>
    </div>

};

export default Home;
