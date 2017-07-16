import React from 'react'
import {  Button, Checkbox, Form , Modal } from 'semantic-ui-react'

const customDialog = {
    textAlign : 'center'
}

const socialButton = {
    width: '100%'
}

class EditProfileDialog extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            'user' : this.props.user,
            'error' : {
                'gender' : false,
                'age' : false,
                'weight' : false,
                'weight_unit' : false,
                'height' : false,
                'height_unit' : false,
                'activity_type' : false
            },
            'values' : {
                'gender' : this.props['user']['gender'],
                'age' : this.props['user']['age'],
                'weight' : this.props['user']['bmi_parameters']['weight'],
                'weight_unit' : this.props['user']['bmi_parameters']['weight_unit'],
                'height' : this.props['user']['bmi_parameters']['height'],
                'height_unit' : this.props['user']['bmi_parameters']['height_unit'],
                'activity_type' : this.props['user']['activity_type']
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

     handleChange = (e, { name, value }) => {
         this.state.values[name] = value;
         this.state.error[name] = value == '';
         this.setState(
            { 
                'error' : this.state.error,
                'values' : this.state.values
            });
    }

    submitForm(){
        var checkResult = {};
        var hasError = false;
        for(var item in this.state.values){
            if(this.state.values[item] == ''){
                checkResult[item] = true;
                hasError = true;
            }
        }
        if(hasError){
            this.setState({ 'error' : checkResult});
        }
        else{
            var user = this.props.user;
            user.gender = this.state.values['gender'];
            user.age = this.state.values['age'];
            user['bmi_parameters'] = {
                "weight" : this.state.values['weight'],
                "weight_unit" : this.state.values['weight_unit'],
                "height" : this.state.values['height'],
                "height_unit" : this.state.values['height_unit'],
            };
            user['activity_type'] = this.state.values['activity_type'];
            this.props.callback(user);
        }
        
    }

    isFormValid(){
        var hasError = false;
        for(var item in this.state.values){
            if(this.state.values[item] == ''){
                hasError = true;
                break;
            }
        }
        return hasError;
    }

    render(){
        return (
            <Modal open={this.props.open} closeOnDimmerClick={false} closeOnDocumentClick={false}
                closeOnEscape={false}
                closeOnRootNodeClick={false}
            >
                <Modal.Header>Edit Profile</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <Form onSubmit={this.submitForm}>
                        <Form.Group widths='equal'>
                            <Form.Select label='Gender' name="gender" options={[
                                { key: 'm', text: 'Male', value: 'Male' },
                                { key: 'f', text: 'Female', value: 'Female' },
                                ]} placeholder='Gender' onChange={this.handleChange} 
                                error={this.state['error']['gender']}  
                                value={this.state['values']['gender']}  
                            />
                            <Form.Input label='Age(in years)' name="age" type="number" placeholder='Age(in years)' 
                            onChange={this.handleChange} error={this.state['error']['age']}  value={this.state['values']['age']}   />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input label='Weight' name="weight" type="number" placeholder='Weight' value={this.state['values']['weight']}   error={this.state['error']['weight']}  onChange={this.handleChange}/>
                            <Form.Select label='Weight Unit' name="weight_unit" placeholder="Weight Unit" options={[
                                { key: 'g', text: 'g', value: 'g' },
                                { key: 'kg', text: 'kg', value: 'kg' },
                                { key: "oz", text: 'oz',value: 'oz'},
                                {key: 'lb',text: 'lb',value: 'lb'}
                                ]} onChange={this.handleChange} 
                                error={this.state['error']['weight_unit']}   value={this.state['values']['weight_unit']}  />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input label='Height' name="height" type="number" placeholder='Height' value={this.state['values']['height']}   error={this.state['error']['height']}    onChange={this.handleChange} />
                            <Form.Select label='Height Unit' name="height_unit" placeholder="Height Unit" error={this.state['error']['height_unit']}  options={[
                                { key: 'mm', text: 'mm', value: 'mm' },
                                { key: 'cm', text: 'cm', value: 'cm' },
                                {key: 'm', text: 'm',value: 'm'},
                                {key: 'in', text: 'in',value: 'in'},
                                {key: 'ft',text: 'ft',value: 'ft'},
                                {key: 'mi',text: 'mi',value: 'mi'}
                                ]} onChange={this.handleChange} value={this.state['values']['height_unit']}  />
                        </Form.Group>
                        <Form.Field>
                                <Form.Select label='Activity Type' name="activity_type" value={this.state['values']['activity_type']}  error={this.state['error']['activity_type']} placeholder="Activity Type" options={[
                                { key: "No Exercise", text: "No Exercise", value: "No Exercise" },
                                { key: "Little Exercise", text: "Little Exercise", value: "Little Exercise" },
                                {key: "Daily Exercise", text: "Daily Exercise",value: "Daily Exercise"},
                                {key: "Routine Physical Work", text: "Routine Physical Work",value: "Routine Physical Work"},
                                {key: "Exercise And Physical Work",text: "Exercise And Physical Work",value: "Exercise And Physical Work"},
                                ]}  onChange={this.handleChange}  />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
  

export default EditProfileDialog