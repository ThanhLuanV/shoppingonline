import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // Import custom CSS for further customization if needed

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    if (this.context.token === '') {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center text-primary mb-4">ADMIN LOGIN</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={this.state.txtUsername} 
                  onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={this.state.txtPassword} 
                  onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                onClick={(e) => this.btnLoginClick(e)}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      );
    }
    return (<div />);
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;
