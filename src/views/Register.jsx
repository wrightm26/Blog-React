import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register({ flashMessage }) {

    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault();
        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        if (password !== confirmPass) {
            flashMessage('Passwords do not match', 'warning');
        } else {
            console.log('Passwords do match')

            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                email: event.target.email.value,
                username: event.target.username.value,
                password: event.target.password.value
            })

            fetch(`http://localhost:5000/api/users`,{
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        flashMessage(data.error, 'error');
                    } else {
                        flashMessage(`${data.username} has been created`, 'success');
                        navigate('/');
                    }
                })
        }
    }
    return (
        <div>
           <h3 className="text-center mt-5">Sign Up</h3>
            <form action="" onSubmit={handleRegister}>
                <div className="form-group mt-5">
                    <div className="row">
                        <div className="col-6">
                            <input type="text" name="firstName" className="form-control my-3" placeholder='Enter First Name' />
                        </div>
                        <div className="col-6">
                            <input type="text" name="lastName" className="form-control my-3" placeholder='Enter Last Name' /></div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="text" name="email" className="form-control my-3" placeholder='Enter Email' />
                        </div>
                        <div className="col-6">
                            <input type="text" name="username" className="form-control my-3" placeholder='Enter Username' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="password" name="password" className="form-control my-3" placeholder='Enter Password' />
                        </div>
                        <div className="col-6">
                            <input type="password" name="confirmPass" className="form-control my-3" placeholder='Confirm Password' />
                        </div>
                    </div>

                    <input type="submit" value="Sign Up" className='btn btn-secondary w-100 mt-5 p-3' />
                </div>
            </form>

        </div>
  )
}
