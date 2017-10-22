import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as textActions from '../actions/text-actions';

class TextView extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool.isRequired,
        data: PropTypes.array.isRequired,

        onLoadFromTable: PropTypes.func.isRequired,
        onSaveToTable: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onTextParseFailed: PropTypes.func.isRequired,
    };

    handleChange = (e) => {
        const {onEdit, onTextParseFailed} = this.props;
        const str = e.target.value;
        try {
            const dataArray = [] = JSON.parse(str); // todo fix Array of Objects
        }
        catch (error) {
            onTextParseFailed({str});
            return;
        }
        onEdit({str});
    };

    handleSaveToTable = () => {
        const {text, isCorrect, onSaveToTable} = this.props;
        if (!isCorrect) return;
        console.log(JSON.parse(text));
        // todo fix
        // onSaveToTable({str: JSON.parse(text)});
    };

    render() {
        const {text, data, isCorrect, onLoadFromTable, onSaveToTable} = this.props;

        return (
            <div>
                <textarea name="text" id="text-id" cols="40" rows="15"
                          value={text}
                          onChange={this.handleChange}/>
                <button className="load-from-table-button"
                        onClick={onLoadFromTable.bind(this, {str: JSON.stringify(data, "", 2)})}>
                    load from table
                </button>
                <button className="save-to-table-button"
                        disabled={!isCorrect}
                        onClick={this.handleSaveToTable}>
                    save to table
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        text: state.text.jsonStr,
        isCorrect: state.text.isCorrect,

        data: state.table.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadFromTable: bindActionCreators(textActions.textLoadedFromTable, dispatch),
        onSaveToTable: bindActionCreators(textActions.textSavedToTable, dispatch),
        onEdit: bindActionCreators(textActions.textEdited, dispatch),
        onTextParseFailed: bindActionCreators(textActions.textParseFailed, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextView);