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

        onImportFromTable: PropTypes.func.isRequired,
        onExportToTable: PropTypes.func.isRequired,
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
            onTextParseFailed(str);
            return;
        }
        onEdit(str);
    };

    handleExportToTable = () => {
        const {text, isCorrect, onExportToTable} = this.props;
        if (!isCorrect) return;
        onExportToTable(JSON.parse(text));
    };

    render() {
        const {text, data, isCorrect, onImportFromTable} = this.props;

        return (
            <div>
                <textarea name="text" id="text-id" cols="40" rows="15"
                          value={text}
                          onChange={this.handleChange}/>
                <button className="import-from-table-button"
                        onClick={onImportFromTable.bind(this, JSON.stringify(data, "", 2))}>
                    import from table
                </button>
                <button className="export-to-table-button"
                        disabled={!isCorrect}
                        onClick={this.handleExportToTable}>
                    export to table
                </button>
                <input type="file" id="file-reader"/>
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
        onImportFromTable: bindActionCreators(textActions.textImportedFromTable, dispatch),
        onExportToTable: bindActionCreators(textActions.textExportedToTable, dispatch),
        onEdit: bindActionCreators(textActions.textEdited, dispatch),
        onTextParseFailed: bindActionCreators(textActions.textParseFailed, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextView);