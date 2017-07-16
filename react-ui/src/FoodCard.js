import React from 'react'
import { Card, Image } from 'semantic-ui-react'

class FoodCard extends React.Component{

    constructor(props){
      super(props);
      this.openModal = this.openModal.bind(this);
    }

    openModal(){
      this.props.openModal(this.props.food);
    }
  
    render(){
        return (
            <Card onClick={this.openModal}>
              <Image src="http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg" />
              <Card.Content>
                <Card.Header>
                  {this.props.food.name}
                </Card.Header>
                <Card.Description>
                  Calories : {this.props.food['kCal'] != '' ? this.props.food['kCal'] : "1"} KCal(s)
                </Card.Description>
              </Card.Content>
            </Card>
        );
    }

}


export default FoodCard