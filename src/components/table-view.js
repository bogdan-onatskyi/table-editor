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
    };

    static editRowValues(name = '', value = '') {
        name = prompt('Введите значение для name', name);
        value = prompt('Введите значение для value', value);

        return {name: name, value: value};
    }

    handleAppendButton = () => {
        this.props.onAppendRow(TableView.editRowValues());
    };

    handleEditButton = (i, name, value) => {
        this.props.onEditRow({i, ...TableView.editRowValues(name, value)});
    };

    handleInsertButton = (i, name, value) => {
        this.props.onInsertRow({i, ...TableView.editRowValues(name, value)});
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
                        <button className="edit-button"
                                onClick={this.handleEditButton.bind(this, i, name, value)}>
                            edit
                        </button>
                        <button className="insert-button"
                                onClick={this.handleInsertButton.bind(this, i + 1, name, value)}>
                            insert
                        </button>
                        <button className="move-up-button"
                                onClick={onMoveUpRow.bind(this, {i})}>
                            move up
                        </button><button className="move-down-button"
                                onClick={onMoveDownRow.bind(this, {i})}>
                            move down
                        </button><button className="delete-button"
                                onClick={onDeleteRow.bind(this, {i})}>
                            delete
                        </button>
                    </td>
                </tr>
            );
        }));
    };

    render() {
        return (
            <div>
                <table>
                    <caption>{this.props.title}</caption>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>value</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                    </tr>
                    </tfoot>
                </table>
                <button className="append-button" onClick={this.handleAppendButton}>
                    Добавить строку
                </button>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView);