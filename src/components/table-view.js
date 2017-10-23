import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as tableActions from '../actions/table-actions';

class TableView extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,

        onEditRow: PropTypes.func.isRequired,
        onInsertRow: PropTypes.func.isRequired,
        onAppendRow: PropTypes.func.isRequired,
        onDeleteRow: PropTypes.func.isRequired,
        onMoveUpRow: PropTypes.func.isRequired,
        onMoveDownRow: PropTypes.func.isRequired,

        onSortUp: PropTypes.func.isRequired,
        onSortDown: PropTypes.func.isRequired,
    };

    static editValue(propName, propValue = '') {
        return prompt(`Введите значение для ${propName}`, propValue);
    }

    handleAppendButton = () => {
        this.props.onAppendRow(
            TableView.editValue('name'),
            TableView.editValue('value')
        );
    };

    handleEditButton = (i, name, value) => {
        this.props.onEditRow(
            i,
            TableView.editValue('name', name),
            TableView.editValue('value', value)
        );
    };

    handleInsertButton = (i, name, value) => {
        this.props.onInsertRow(
            i,
            TableView.editValue('name', name),
            TableView.editValue('value', value)
        );
    };

    sortDirection = [0, 0];
    handleSort = (i) => {
        const {onSortUp, onSortDown} = this.props;
        this.sortDirection[i] ? onSortDown(i) : onSortUp(i);
        this.sortDirection[i] = 1 - this.sortDirection[i];
    };

    renderRows() {
        const {data, onMoveUpRow, onMoveDownRow, onDeleteRow} = this.props;

        return (data.map((row, i) => {
            const {name, value} = row;
            return (
                <tr key={"row_" + i}>
                    <td>{i}</td>
                    <td>{name}</td>
                    <td>{value}</td>
                    <td>
                        <button className="edit-button btn-floating red"
                                onClick={this.handleEditButton.bind(this, i, name, value)}>
                            <i className="material-icons">edit</i>
                        </button>
                        <button className="insert-button btn-floating red"
                                onClick={this.handleInsertButton.bind(this, i + 1, name, value)}>
                            <i className="material-icons">add</i>
                        </button>
                        <button className="move-up-button btn-floating red"
                                onClick={onMoveUpRow.bind(this, i)}>
                            <i className="material-icons">arrow_upward</i>
                        </button>
                        <button className="move-down-button btn-floating red"
                                onClick={onMoveDownRow.bind(this, i)}>
                            <i className="material-icons">arrow_downward</i>
                        </button>
                        <button className="delete-button btn-floating red"
                                onClick={onDeleteRow.bind(this, i)}>
                            <i className="material-icons">delete</i>
                        </button>
                    </td>
                </tr>
            );
        }));
    };

    renderTable() {
        return (
            <table className="highlight bordered centered">
                <caption>{this.props.title}</caption>
                <thead>
                <tr>
                    <th>id</th>
                    <th>
                        <i className="material-icons"
                           onClick={this.handleSort.bind(this, 0)}>
                            {this.sortDirection[0] ? "sort" : "add"}</i>
                        name
                    </th>
                    <th>
                        <i className="material-icons"
                           onClick={this.handleSort.bind(this, 1)}>
                            {this.sortDirection[1] ? "sort" : "add"}</i>
                        value
                    </th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
                <tfoot>
                <tr>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                </tr>
                </tfoot>
            </table>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    {this.renderTable()}
                    <button className="append-button" onClick={this.handleAppendButton}>
                        Добавить строку
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        title: state.table.title,
        data: state.table.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditRow: bindActionCreators(tableActions.rowEdited, dispatch),
        onInsertRow: bindActionCreators(tableActions.rowInserted, dispatch),
        onAppendRow: bindActionCreators(tableActions.rowAppended, dispatch),
        onDeleteRow: bindActionCreators(tableActions.rowDeleted, dispatch),
        onMoveUpRow: bindActionCreators(tableActions.rowMovedUp, dispatch),
        onMoveDownRow: bindActionCreators(tableActions.rowMovedDown, dispatch),

        onSortUp: bindActionCreators(tableActions.colSortedUp, dispatch),
        onSortDown: bindActionCreators(tableActions.colSortedDown, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView);