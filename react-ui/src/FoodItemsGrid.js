import React from 'react'
import { Grid, Image,Dimmer,Loader,Segment } from 'semantic-ui-react'
import FoodCard from "./FoodCard"
import FoodDetailsDialog from './FoodDetailsDialog'
import axios from 'axios'

class FoodItemsGrid extends React.Component {

    constructor(props){
      //localStorage.clear();
      super(props);
      this.state = {
        items : [],
        shownFood : null,
        open : false,
        loading: false,
        bmiStatus : "Loading..."
      }
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.enableScroll = this.enableScroll.bind(this);
      this.disableScroll = this.disableScroll.bind(this);
      this.preventDefault = this.preventDefault.bind(this);
      this.preventDefaultForScrollKeys = this.preventDefaultForScrollKeys.bind(this);
      this.getBmiMessage = this.getBmiMessage.bind(this);
    }

    openModal(food){
      this.state.shownFood = food;
      this.state.open = true;
      this.setState(this.state);
    }

    closeModal(food){
      this.state.shownFood = null;
      this.state.open = false;
      this.setState(this.state);
    }

    preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    preventDefaultForScrollKeys(e) {
        let keys = {37: 1, 38: 1, 39: 1, 40: 1};
        if (keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    }

    disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onwheel = this.preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
      window.ontouchmove  = this.preventDefault; // mobile
      document.onkeydown  = this.preventDefaultForScrollKeys;
    }

    enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }

    getBmiMessage(){
      switch(this.state.bmiStatus){
        case "Obese" : return "Yuhu ! Looks like you seem to have a really fat tummy. Don't worry, loading some good choices and amount of food you can have.";
        case "Overweight" : return "It seems you are little too healthy. Never mind, loading some good options and amounts you can prefer";
        case "Underweight" : return "Oops ! Looks like you need to grow my friend. Fetching awesome options for foods you can try";
        case "Normal" : return "Ho Ho Ho ! Looks like some healthy chap is trying this out. But still fetching some good advices"; 
        default : return "Loading...";
      }
    }


    componentDidMount(){
        var that = this;
        if(localStorage.getItem("user") != null){
            console.log("user exists in food ->");
            console.log(localStorage.getItem("user"));
            var user = JSON.parse(localStorage.getItem("user"));
            var messaging = window.messaging;
            messaging.requestPermission()
            .then(function() {
              console.log('Notification permission granted.');
              messaging.getToken()
                .then(function(currentToken) {
                  if (currentToken) {
                    console.log("token -> ");
                    console.log(currentToken);
                    var data = {
                      "user_id" : user["_id"],
                      "device_token" : currentToken
                    }
                    console.log(data);
                    axios.post("https://food-recommendation-app.herokuapp.com/notifications/updateUserDevice",data).then(function(response){
                        console.log(response);
                        if(response.data.status == "error"){
                          window.alert("Some error occurred, try again later");
                        }
                    });
                  } else {
                    // Show permission request.
                    console.log('No Instance ID token available. Request permission to generate one.');
                    // Show permission UI.
                    //updateUIForPushPermissionRequired();
                    //setTokenSentToServer(false);
                  }
                })
                .catch(function(err) {
                  console.log('An error occurred while retrieving token. ', err);
                  //showToken('Error retrieving Instance ID token. ', err);
                  //setTokenSentToServer(false);
                });
            })
            .catch(function(err) {
              console.log('Unable to get permission to notify.', err);
            });
        }
        this.setState({loading : true});
        this.disableScroll();
        if(localStorage.getItem("foodList") != null && localStorage.getItem("bmiStatus") != null){
          window.setTimeout(function(){
            console.log(JSON.parse(localStorage.getItem("foodItems")));
            that.setState({ 'items' : JSON.parse(localStorage.getItem("foodList")), bmiStatus : localStorage.getItem("bmiStatus")});
            window.setTimeout(function(){
                  that.enableScroll();
                  that.setState({ loading : false});
                },5000);
          },5000);
        }
        else if(localStorage.getItem("user") != null){
          var user = JSON.parse(localStorage.getItem("user"));
          axios.get("https://food-recommendation-app.herokuapp.com/diet/get/user/"+user["_id"]).then(function(response){
            if(response.data.status == "success"){
              console.log(response);
              window.setTimeout(function(){ 
                localStorage.setItem("foodList",JSON.stringify(response.data.data.foodItems)); 
                localStorage.setItem("bmiStatus",response.data.data['bmi_data']['status']);
                that.setState({ 'items' : response.data.data.foodItems , bmiStatus : response.data.data['bmi_data']['status']});
                window.setTimeout(function(){
                  that.enableScroll();
                  that.setState({ loading : false});
                },5000);
              },5000);
            }
            else{
              axios.get("https://food-recommendation-app.herokuapp.com/diet/get/userDietDetails/"+user['_id']).then(function(response){
              console.log(response);
              if(response.data.status == "success"){
                response.data.data['user'] = user;
                axios.post("https://food-recommendation-app.herokuapp.com/diet/add",response.data.data).then(function(response){
                  console.log(response.data);
                  window.setTimeout(function(){ 
                    localStorage.setItem("foodList",JSON.stringify(response.data.data.foodItems)); 
                    localStorage.setItem("bmiStatus",response.data.data['bmi_data']['status']);
                    that.setState({ 'items' : response.data.data.foodItems , bmiStatus : response.data.data['bmi_data']['status']});
                    window.setTimeout(function(){
                      that.enableScroll();
                      that.setState({ loading : false});
                    },5000);
                  },5000);
                });
              }
              });
            }
          });
        }
    }

    render(){
        return (
              <div>
              <Dimmer active={this.state.loading}>
                <Loader >{this.getBmiMessage()}</Loader>
              </Dimmer>
              <div>
                <br/><br/>
                <Grid container>
                  {
                    this.state.items.map((item) => {
                        return (
                            <Grid.Column mobile={12} computer={4} largeScreen={4}>
                                <FoodCard openModal={this.openModal} food={item}/>
                            </Grid.Column>
                        );
                    })
                  }
                </Grid>
              </div>
              <FoodDetailsDialog open={this.state.open} food={this.state.shownFood} close={this.closeModal} />
              </div>
        );
    }

}

export default FoodItemsGrid
