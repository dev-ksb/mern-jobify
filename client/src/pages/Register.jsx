import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Alert, Logo } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  //global state and useNavigate
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    register,
    login: loginUser,
  } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleMember = () =>
    setValues((prevState) => ({ ...prevState, isMember: !prevState.isMember }));

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    if (isMember) {
      loginUser(values);
    } else {
      register(values);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            labelText="Name"
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          labelText="Email"
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          labelText="Password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
