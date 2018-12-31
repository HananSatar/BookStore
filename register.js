import React, { Component } from 'react'
import 'whatwg-fetch'
import {
  getFromStorge,
  setInStorge
} from './storge'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading:true,
           name:'',
            age:'',
           email: '',
          password: ''
         // user:[]
        };
      }

      componentDidMount() {
        const token=getFromStorge('the_main_app');
        if(token){
         // <form enctype="multipart/form-data" action="http://localhost:5000/api/user/login" method="post"></form>
          fetch('http://localhost:3000/api/user/login" { method="post"}')
          .then(res => res.json())
          .then(json => {
            if(json.success){

              this.setState({
                token,isLoading:false
              });
            }else{
                this.setState({
                  isLoading:false,
                });
            }   
            });
        }else{
          this.setState({
            isLoading:false,
          })
        }
      }
    //     fetch('/api/user',{method:'get',headers:{'Content-type':'Application/json',},
    //   body:json.stringify({
    //     get:this.state.get
    //   }),});
    //   const body=await response.text();

    //   this.setState({responsetopost:body});
    // }
          // .then(res => res.json())
          // .then(user => this.setState({user}))
      
    
  // 
  render() {
  const { isLoading,token
  } =this.state;
  if(isLoading){
    return(<div><p>Loading..........</p></div>);

  }
if(!token){
  return(
    <div>
      <p>login</p>
    </div>
  );
}

return(
<div>
  <p>Accout</p>
</div>)
<div>
<div enctype="multipart/form-data" action="http://localhost:3000/api/user/register" method="post">
        name <input type="text" name="name" ><br/></input>

        age <input type="text" name="age" ><br/></input>

        email <input type="file" name="email"><br/></input>

        password <input type="text" name="password" ><br/></input>
        <button type="submit" name="button">Go</button><br/>
        

</div>
   }
   }

export default Register