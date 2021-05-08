import AOS from 'aos'; 
import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

//stylesheets
import './index.scss';
import 'aos/src/sass/aos.scss';
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
      AOS.init();

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
                    <h1> Evolve<br/> Band</h1>
                    <h2 data-aos="zoom-in" data-aos-delay="3000" data-aos-duration="2000" data-aos-easing="ease-out-cubic">Coming Soon</h2>
                    <p data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500" data-aos-easing="ease-out-cubic">
                        Creating experiences for your event.
                    </p>
                    <form onSubmit={handleSubmit(onSubmitEmail)} data-aos-delay="3000"  data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-out-cubic">
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
