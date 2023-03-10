import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {loginUser} from '@store/reducers/auth';
import {setWindowClass} from '@app/utils/helpers';
import {Form, InputGroup} from 'react-bootstrap';
import {PfButton, PfCheckbox} from '@profabric/react-components';

import * as AuthService from '../../services/auth';

const Register = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const register = async (name: string, username: string, password: string) => {
    // try {
    //   setAuthLoading(true);
    //   const token = await AuthService.registerByAuth(email, password);
    //   setAuthLoading(false);
    //   dispatch(loginUser(token));
    //   toast.success('Registration is success');
    //   navigate('/');
    // } catch (error: any) {
    //   toast.error(error.message || 'Failed');
    //   setAuthLoading(false);
    // }
    setAuthLoading(true);
    AuthService.registerData({name, username, password})
      .then((response) => {
        setAuthLoading(false);
        toast.success('Register is succeed!');
        navigate('/login');
        console.log(response);
      })
      .catch((error) => {
        setAuthLoading(false);
        toast.error(error.message || 'Failed');
        console.log(error);
      });
  };

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      username: Yup.string().required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required')
    }),
    onSubmit: (values) => {
      register(values.name, values.username, values.password);
    }
  });

  setWindowClass('hold-transition register-page');

  return (
    <div className="register-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h2">
            <b>Data </b>
            <span>Andalan Utama</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t<string>('register.registerNew')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  value={values.name}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && !!errors.name}
                />
                {touched.name && errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.username}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                {touched.username && errors.username ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-12">
                <PfButton
                  type="submit"
                  block
                  loading={isAuthLoading}
                  disabled={isFacebookAuthLoading || isGoogleAuthLoading}
                >
                  {t<string>('register.label')}
                </PfButton>
              </div>
            </div>
          </form>
          <Link to="/login" className="text-center">
            {t<string>('register.alreadyHave')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
