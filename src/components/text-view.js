import React, {Component} from 'react';
import {connect} from 'react-redux';

class TextView extends Component {

    render() {
        const {text} = this.props.text;
        return (
            <div>
                <textarea name="text" id="text-id" cols="30" rows="5"
                          value={text}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        text: state.text
    };
}

export default connect(mapStateToProps)(TextView);