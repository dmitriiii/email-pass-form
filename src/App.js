import React from 'react';
import Axios from 'axios';
import styles from  './App.module.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@mail.com',
      pass: '12345m',
      chosen: 'email',
      
      msg: '',
      msg_class: 'normal',
      success: false,
      accounts: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  } 

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const obj = {};
    obj[name] = value;    
    this.setState(obj);
  }

  handleRadio(e) {
    this.setState({
      msg: '',
      chosen: e.target.value,
    });
  }

  handleCheck(){
    const self = this;
    const chosen = self.state.chosen;
    // console.log(chosen);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDM1NjBmMzFjNjczYjY2YmFjZGQwZDc2YTExZWU1MGQ5NWFkNzk5OWJmYTcwNGIzZmI0ZTA4MWZmYWFhMzc2YWFhMjljODA2NGE1YTZjYmUiLCJpYXQiOjE2MTIyOTQ5OTMsIm5iZiI6MTYxMjI5NDk5MywiZXhwIjoxNjQzODMwOTkzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.JcXJzjFu0Yo6zPYr9fvSy1tSS0XsCJrHx-y3ISBgSITAalwQ9ZQTIAqLTdcfpqCrCFrK4ITKkcEAUin5P-7Ac37Kfy1NT3-Oe1q71p3WykNEd7fSqUeyjKqePqL88wcE2A_hJ5CeCsNjsxsf6kkn_-bQLN11ETPTFJ5oApXUoL5ytvN9xxYCMC_Uuww7OpM_clVsK_sAas10F9rExA2yGqN5WAzYOBys_wCAVQTOBYLROwokR3Ouv1_3SL93yg-F1yodFhS4w22fBPGSN1gpBqG-LtkR8CnfX0Q8hPbzUe36wVHKJ3Q8OcdzydAyxteCOuwcPNadDMcHEvd3P6OLp0zU-ayFCuxd1n-x9asvmknOaJrZC3smbfNydjOiiavohHGH96UIYoc2wZjXpDNtFeYCmsndAznYNXNNN1nNIXL4WDfkPpmvCebUsUdiqiLtSce-eIJ4ja104kqy1xNaIUGkL8pqYTKk0z175NV5P70aDSRQJnt-l0p6RGDFPCaGjzodehY1bWhnjLndUKe990_rM4LgbuD5Shg9WYfrFipIcfRADRm5FQwpbx9WsvTu7usCxso8ZUNxRkdk7GNUNWuSGoRmHM9_EVaNlmFJH8pfB30Iy98VFtvKqQKYwAOx8w5qylj2Hc7NFttk-dIbtPL_WXIxHVChCDPlhBNrMuA";
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const bodyParameters = {
      field: chosen,
      value: self.state[chosen]
    };
    
    Axios.post( 
      'http://api.pro24web.site/api/account',
      bodyParameters,
      config
    ).then(function(res){
      let msg = res.data.msg;

      const accounts = res.data.accounts;
      if( typeof accounts !== 'undefined' && accounts.length > 0 ){
        msg = msg + ' Your ' + ((chosen == 'email') ? 'Password' : 'Email') +' is: '; 
        accounts.forEach(function (account, index) {
          if( chosen==='email' ){
            msg = msg + account.pass + ' ';
            // const found = 'pass';
          }
          else{
            msg = msg + account.email + ' ';
          }
        });
      }
      self.setState({
        msg: msg,
        success: res.data.success,
        accounts: accounts
      });
      // console.log(res);
    }).catch(console.log);

  }

  render() {
    const chosen = this.state.chosen;
    let input_field;
    const msg_class = this.state.msg_class;
    // const success = this.state.success;
    let msg_style = {
      backgroundColor: '#e43f5a',
      // padding: '5px 0'
    };
    if(this.state.success){
      msg_style = {
        backgroundColor: '#3c9',
        // padding: '5px 0'
      }
    }
    if( chosen === 'email' ){
      input_field = <input type='email' name='email' onChange={this.handleChange} value={this.state.email}/>
    }
    else{
      input_field = <input type='text' name='pass' onChange={this.handleChange} value={this.state.pass}/>
    }
    return (
      <div className={styles.main}>
      <h4 className={styles.title}>Insert your NordVPN account's email or password</h4>
      <div className={styles.radios}>
        <label className={styles.label}> 
          <input type="radio" value="email" name="chosen" onChange={this.handleRadio} checked={this.state.chosen==="email"}/> 
          <span className={styles.checkmark}></span>
          <em>Email</em>
        </label>
        <label className={styles.label}> 
          <input type="radio" value="pass" name="chosen" onChange={this.handleRadio} checked={this.state.chosen==="pass"}/>
          <span className={styles.checkmark}></span>
          <em>Password</em>
        </label>
      </div>
      <div className={styles.message_box}>
        <p style={msg_style}>
          {this.state.msg}
        </p>
      </div>
      <div className={styles.input_box}>
        {input_field}
        <button onClick={this.handleCheck}>Check!</button>
      </div>
    </div>
    );
  }
}
export default App;
