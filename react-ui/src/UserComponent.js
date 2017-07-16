import React from 'react';

import NavBar from './NavBar';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import EditProfileDialog from './EditProfileDialog';
import axios from 'axios';

class UserComponent extends React.Component{

    constructor(props){
        super(props);
        //localStorage.clear();
        if(localStorage.getItem("user") != null){
            console.log("user exists ->");
            console.log(localStorage.getItem("user"));
            this.state = {
                user : JSON.parse(localStorage.getItem("user")),
                loggedIn : true,
                editProfile : false
            };
        }
        else{
            this.state = {
                user : {},
                loggedIn : false
            };
        }
        this.login = this.login.bind(this);
        this.handlerCallback = this.handlerCallback.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.logout = this.logout.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.viewEditProfile = this.viewEditProfile.bind(this);
    }

    login(user,provider){
        var user = {
            "email" : user.email,
            "name" : {
                "first_name" : user.firstName,
                "last_name" : user.lastName
            },
            "account_id" : user.id,
            "account_type" : provider
        };
        var that = this;
        console.log('user ->');
        console.log(user);
        axios.post('https://food-recommendation-app.herokuapp.com/user/authenticate',user).then(function(response){
            console.log("authenticate -> ");
            console.log(response.data.data);
            if(response.data.data == null){
                user['is_activated'] = false;
                that.setState({'user' : user,loggedIn : true});
            }
            else{
                localStorage.setItem("user",JSON.stringify(response.data.data));
                that.setState({ 'user' : response.data.data, loggedIn : true});
                window.location.reload();
            }
        });
    }

    handlerCallback(user,err){
        if(err){
            window.alert(err);
            return;
        }
        this.login(user['_profile'],user['_provider']);
    }

    registerUser(userData){
        console.log("userData ->");
        console.log(userData);
        var that = this;
        axios.post('https://food-recommendation-app.herokuapp.com/user/add',userData).then(function(response){
            if(response.data.status == "success"){
                console.log(response.data.data);
                localStorage.setItem("user",JSON.stringify(response.data.data));
                that.setState({'user' : response.data.data,loggedIn : true});
                window.location.reload();
            }
            else{
                console.log(response.data);
                window.alert(response.data.data);
            }
        });
    }

    viewEditProfile(){
       this.setState({editProfile : true}); 
    }

    saveProfile(userData){
        console.log("userData(saveProfile) ->");
        console.log(userData);
        var that = this;
        axios.put('https://food-recommendation-app.herokuapp.com/user/update/'+userData['_id'],userData).then(function(response){
            if(response.data.status == "success"){
                console.log(response.data);
                localStorage.setItem("user",JSON.stringify(response.data.data));
                that.setState({'user' : response.data.data,loggedIn : true,editProfile : false});
                localStorage.removeItem("foodItems");localStorage.removeItem("bmiStatus");
                window.location.reload();
            }
            else{
                console.log(response.data);
                window.alert(response.data.data);
            }
        });
    }

    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("foodItems");
        localStorage.removeItem("foodList");
        localStorage.removeItem("bmiStatus");
        this.setState({ "user" : {}, "loggedIn" : false});
        window.location.reload();
    }

    render(){
        if(!this.state.loggedIn){
            return (<div><NavBar/><LoginDialog callback={this.handlerCallback} /></div>);
        }
        else if(!this.state.user['is_activated']){
            return (<div><NavBar/><RegisterDialog user={this.state.user} callback={this.registerUser}/></div>);
        }
        else
            return (<div><NavBar editProfile={this.viewEditProfile} logout={this.logout} /><EditProfileDialog open={this.state.editProfile} user={this.state.user} callback={this.saveProfile} /></div>);
    }

}

export default UserComponent