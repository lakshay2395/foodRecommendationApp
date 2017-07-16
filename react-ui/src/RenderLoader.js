import React from 'react'
import { Dimmer, Loader} from 'semantic-ui-react'

class RenderLoader extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Dimmer active={this.props.showLoader}>
              <Loader>{this.props.text}</Loader>
            </Dimmer>
        );
    }
}