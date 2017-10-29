import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ActionButton extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render() {
        const {onClick, icon, title} = this.props;

        return (
            <button
                className="btn-floating waves-effect waves-light"
                onClick={onClick}
                title={title}>
                <i className={`icon-${icon}`}/>
            </button>
        );
    }
}

export default ActionButton;