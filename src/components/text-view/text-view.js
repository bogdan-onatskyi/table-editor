import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import csvParser from 'csv-parse';
import csvStringifier from 'csv-stringify';

import {
    textImportedFromTable, textExportedToTable, textEdited, textParseFailed
} from '../../actions/text-actions';

import TabView from "./tab";

import './text-view.scss';

class TextView extends Component {
    static propTypes = {
        str: PropTypes.shape({
            JSON: PropTypes.string.isRequired,
            CSV: PropTypes.string.isRequired
        }),
        isCorrect: PropTypes.shape({
            JSON: PropTypes.bool.isRequired,
            CSV: PropTypes.bool.isRequired
        }),

        data: PropTypes.array.isRequired,

        onImportFromTable: PropTypes.func.isRequired,
        onExportToTable: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onTextParseFailed: PropTypes.func.isRequired
    };

    handleOnChangeJSON = (e) => {
        const str = e.target.value;
        const {onEdit, onTextParseFailed} = this.props;

        try {
            const dataArray = [] = JSON.parse(str); // todo: check is it an Array of Objects
        }
        catch (error) {
            onTextParseFailed(str, 'JSON');
            return;
        }
        onEdit(str, 'JSON');
    };

    handleOnChangeCSV = (e) => {
        const str = e.target.value;
        const {onEdit, onTextParseFailed} = this.props;

        csvParser(str, (err) => {
            if (err) onTextParseFailed(str, 'CSV');
        });
        onEdit(str, 'CSV');
    };

    handleOnImportFromTableToJSON = () => {
        const {data, onImportFromTable} = this.props;

        onImportFromTable(JSON.stringify(data, null, 4), 'JSON');
    };

    handleOnImportFromTableToCSV = () => {
        const {data, onImportFromTable} = this.props;
        const columns = {
            name: 'name',
            value: 'value'
        };

        csvStringifier(data, {header: true, columns: columns, quoted: true},
            (err, output) => {
                onImportFromTable(output, 'CSV');
            }
        );
    };

    handleOnExportToTableFromJSON = () => {
        const {str, isCorrect, onExportToTable} = this.props;
        if (!isCorrect.JSON) return;

        onExportToTable(JSON.parse(str.JSON));
    };

    handleOnExportToTableFromCSV = () => {
        const {str, isCorrect, onExportToTable} = this.props;
        if (!isCorrect.CSV) return;

        csvParser(str.CSV, {columns: true},
            (err, output) => {
                if (output) onExportToTable(output, 'CSV');
            }
        );
    };

    render() {
        const {str, isCorrect} = this.props;

        return (
            <div className="text-view col s12">
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s6"><a className="active" href="#json">JSON</a></li>
                            <li className="tab col s6"><a href="#csv">CSV</a></li>
                        </ul>
                    </div>
                    <div id="json">
                        <TabView value={str.JSON} onChange={this.handleOnChangeJSON}
                                 onImport={this.handleOnImportFromTableToJSON}
                                 onExport={this.handleOnExportToTableFromJSON}
                                 isCorrect={isCorrect.JSON}/>
                    </div>
                    <div id="csv">
                        <TabView value={str.CSV} onChange={this.handleOnChangeCSV}
                                 onImport={this.handleOnImportFromTableToCSV}
                                 onExport={this.handleOnExportToTableFromCSV}
                                 isCorrect={isCorrect.CSV}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        str: state.text.str,
        isCorrect: state.text.isCorrect,

        data: state.table.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onImportFromTable: (str, format) => dispatch(textImportedFromTable(str, format)),
        onExportToTable: (data) => dispatch(textExportedToTable(data)),
        onEdit: (str, format) => dispatch(textEdited(str, format)),
        onTextParseFailed: (str, format) => dispatch(textParseFailed(str, format))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextView);