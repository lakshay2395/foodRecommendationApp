import React from 'react'
import { Button, Header, Image, Modal,Icon } from 'semantic-ui-react'
import SocialLogin from 'react-social-login'
import { GoogleLogin } from 'react-google-login-component'

const customDialog = {
    textAlign : 'center'
}

const socialButton = {
    width: '100%'
}

 class LoginDialog extends React.Component { 

    constructor(props){
        super(props);
    }
 
    render(){
        return (
            <Modal defaultOpen={true} style={customDialog} size="small" closeOnDimmerClick={false} closeOnDocumentClick={false}
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                >
                <Modal.Content>
                <Modal.Description>
                    <Icon color='teal' name='coffee' size='massive' />
                    <Icon name='food' color='violet' size='massive' />
                    <Header size='huge'>Hi ! Welcome to this awesome food recommendation app. Won't take more than a minute to get started.</Header>
                    <SocialLogin provider='google' appId='404169521812-vs5kij62216tko5jmcaq471cju0a7798.apps.googleusercontent.com' callback={this.props.callback}>
                        <Button color="google plus" size="large" style={socialButton}>Login/Sign Up With Google+</Button>
                    </SocialLogin>
                    <br/><br/>
                    <SocialLogin provider='facebook' appId='115457905743596' callback={this.props.callback}>
                        <Button color="facebook" size="large" style={socialButton}>Login/Sign Up With Facebook</Button>
                    </SocialLogin>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default LoginDialog