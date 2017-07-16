import React from 'react'
import {  Button, Checkbox, Form , Modal,Image } from 'semantic-ui-react'

const food = {
    "name":"Cream Of Wheat,Ckd,Mix N Eat\n",
    "weight_in_grams":"142\n",
    "measure":"1 Pkt\n",
    "kCal":"100\n",
    "_id":"00Q9iR1oAwMVsp0I",
    "pic_url" : "http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg"
}

const custom = {
  width : 'auto'
}

class FoodDetailsDialog extends React.Component {

    render(){
        if(this.props.food == null){
          return (<div></div>);
        }
        return (
          <Modal open={this.props.open} style={custom} 
          >
            <Modal.Content>
              <Modal.Description>
                    <Image src="http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg" />
                    <h4>{this.props.food.name}</h4>
                    {this.props.food.measure}(around {this.props.food['weight_in_grams']} gms) of {this.props.food.name} which gives around {this.props.food.kCal} Kcals.
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.props.close}>
                 Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }

}

export default FoodDetailsDialog