import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { GoogleLogin } from 'react-google-login';
import Navigation from './layout/Navigation';
import Home from './layout/Home';
// import { Redirect } from "react-router-dom";
import {  Redirect} from "react-router-dom";


function App() {

  const [first, setFirst]   = React.useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue]   = React.useState('');
  const [result, setResult] = React.useState('');
  const inputEl             = React.useRef(null);  

  const [logged, setLogged]     = React.useState('');
  // const [onLogin, setLogin]     = React.useState('');
  // const [onLogout, setLogout]   = React.useState('');
  const [id, setID]             = React.useState('');
  const [name, setName]         = React.useState('');
  const [provider, setProvider] = React.useState('');

  const onSubmitForm = (e) => {

    console.log("onSubmiForm inside");
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult('정답');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputEl.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputEl.current.focus();
    }
  };  

  const responseGoogle = async (response) => {
    console.log("google popoup");

    if(response.w3.ofa === 'Sun Ho') {
      console.log(response.w3.ofa);
      console.log(response.w3.getId());
      console.log(response.w3.getEmail());
      console.log(response.w3.getName());
      console.log(response.w3.Paa);
      console.log(response.w3.getImageUrl());
      setLogged(true);
      setID(response.w3.getId());
      setName(response.w3.getName());
      setProvider('google');      
      console.log(response.w3);

      doSignUp();
    
      // await localStorage.setItem("user", JSON.stringify(userObject));
      // await window.location.reload();
      // await window.location.href('/Navigation');
      // await window.location.assign('/Navigation')
      // await window.location.reload();
    } else {
      console.log("google popoup33333333333333");

      doSignUp();     
    }
  };

  // Login Mutation
  const doSignUp = async () => {

    console.log("doSignUp popoup2222222222222222222222222222222222222222222");
    return (
      <div>
          {
              <Redirect to="/Navigation"/>
          }
      </div>
    );  
  }  

  return (
    <React.Fragment>
      {/* <div>
          <Route exact path='/' component={Home} />
          {/* <Route path='/about/:username' component={About} />
          <Route path='/posts'  component={Posts} />
          <Route path='/login'  component={Login} /> }
          <Route path='/Navigation'  component={Navigation} />
      </div> */}

        <div>{first} 곱하기 {second} 는? </div>
        <form onSubmit={onSubmitForm}>
          <input ref={inputEl} type='number' value={value} onChange={ (e) => setValue(e.target.value)} />
          <button> 입력 </button>
        </form>
        <div id="result">{result}</div>
        <div align="center">
          <GoogleLogin
            clientId="868600096434-qp8j8cjb8geil72d28n3p9n5r6t17is6.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        {/* ,
        document.getElementById('googleButton')         */}
      </React.Fragment>       

  );
}

export default App;
