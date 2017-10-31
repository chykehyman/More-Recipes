import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validateInputs from '../../shared/validations/signup';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            username: '',
            email: '',
            password: '',
            repassword: '',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    isValid() {
        const { errors, isValid } = validateInputs(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
        this.setState({ errors: {}, isLoading: true });
        this.props.userSignupRequest(this.state)
        .then(() => {})
        .catch(error => this.setState({ errors: error.response.data.errors, isLoading: false }));
        }
    }
    render() {
        const { fullName, username, email, password, repassword, errors, isLoading } = this.state;

        return (
            // <!--Form Section Start-->
            <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                <h2>Sign Up</h2>
                <p className="lead">Already have a More-Recipes account? <Link to="/api/v1/user/signin">Sign In</Link>
                </p>
                <form role="form" onSubmit={this.handleSubmit} className="pb-2">
                    <div className='form-group'>
                        <label htmlFor="user">Full name</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                id="fullName"
                                name="fullName"
                                value={fullName}
                                onChange = {this.onChange}
                                placeholder="enter full name"/>
                        </div>
                        { errors.fullName && <span className="text-danger small">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">Username</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className=" fa fa-user-circle-o " aria-hidden="true "></i>
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                id="username"
                                name="username"
                                value={username}
                                onChange = {this.onChange}
                                placeholder="enter username"/>
                        </div>
                        { errors.username && <span className="text-danger small">{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className=" fa fa-envelope " aria-hidden="true "></i>
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                id="email"
                                name="email"
                                value={email}
                                onChange = {this.onChange}
                                placeholder="enter email"/>
                        </div>
                        { errors.email && <span className="text-danger small">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className=" fa fa-lock " aria-hidden="true "></i>
                            </div>
                            <input
                                type="password"
                                className="form-control form-control-sm"
                                id="password"
                                name="password"
                                value={password}
                                onChange = {this.onChange}
                                placeholder="enter password"/>
                        </div>
                        { errors.password && <span className="text-danger small">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="repassword">Confirm password</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className=" fa fa-lock " aria-hidden="true"></i>
                            </div>
                            <input
                                type="password"
                                className="form-control form-control-sm"
                                id="repassword"
                                name="repassword"
                                value={repassword}
                                onChange = {this.onChange}
                                placeholder="re-enter password"/>
                        </div>
                        { errors.repassword && <span className="text-danger small">{errors.repassword}</span>}
                    </div>
                    <p className="lead">By signing up you are agreeing to these <Link to="">terms and conditons</Link>
                    </p>
                    <button type="submit" className="btn btn-outline-success" disabled={isLoading}>Sign Up</button>
                </form>
            </div>
        // <!--Form Section End-->
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};