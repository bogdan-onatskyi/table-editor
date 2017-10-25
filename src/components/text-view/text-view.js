import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    textImportedFromTable, textExportedToTable, textEdited, textParseFailed
} from '../../actions/text-actions';

import './text-view.scss';

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
            const dataArray = [] = JSON.parse(str); // todo: check is it an Array of Objects
        }
        catch (error) {
            onTextParseFailed(str);
            return;
        }
        onEdit(str);
    };

    handleOnExportToTable = () => {
        const {text, isCorrect, onExportToTable} = this.props;
        if (!isCorrect) return;
        onExportToTable(JSON.parse(text));
    };

    handleOnImportFromTable = () => {
        const {data, onImportFromTable} = this.props;
        onImportFromTable(JSON.stringify(data, "", 2))
    };

    render() {
        const {text, isCorrect} = this.props;

        return (
            <div className="text-view col s12">
                <textarea className="text-view__text" name="text" cols="40" rows="15"
                          value={text} onChange={this.handleChange}/>

                <div className="text-view__button-group">
                    <button className="btn waves-effect waves-light"
                            onClick={this.handleOnImportFromTable}>
                        import from table
                    </button>
                    <button className="btn waves-effect waves-light" disabled={!isCorrect}
                            onClick={this.handleOnExportToTable}>
                        export to table
                    </button>
                </div>
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
        onImportFromTable: (str) => dispatch(textImportedFromTable(str)),
        onExportToTable: (data) => dispatch(textExportedToTable(data)),
        onEdit: (str) => dispatch(textEdited(str)),
        onTextParseFailed: (str) => dispatch(textParseFailed(str))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextView);