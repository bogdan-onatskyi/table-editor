import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class TabView extends PureComponent {
    static PropTypes = {
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        onImport: PropTypes.func.isRequired,
        onExport: PropTypes.func.isRequired,
        isCorrect: PropTypes.bool.isRequired
    };

    render() {
        const {value, onChange, onImport, onExport, isCorrect} = this.props;
        return (
            <div>
                <textarea className="text-view__text" name="text" cols="40" rows="15"
                          value={value} onChange={onChange}/>

                <div className="text-view__button-group">
                    <button className="btn waves-effect waves-light" onClick={onImport}>
                        import from table
                    </button>
                    <button className="btn waves-effect waves-light" onClick={onExport}
                            disabled={!isCorrect}>
                        export to table
                    </button>
                </div>
            </div>
        );
    }
}

export default TabView;