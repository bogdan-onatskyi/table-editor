import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {rowAppended, colSortedUp, colSortedDown} from '../../actions/table-actions';
import {askUser} from '../utils';

import TableView from './table-view/table-view';

import './table-editor.scss';

class TableEditor extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onAppendRow: PropTypes.func.isRequired,
        onSortUp: PropTypes.func.isRequired,
        onSortDown: PropTypes.func.isRequired,
    };

    handleSort = (paramName, isAsc) => {
        const {onSortUp, onSortDown} = this.props;
        isAsc ? onSortUp(paramName) : onSortDown(paramName);
    };

    handleOnAppendRow = () => {
        this.props.onAppendRow(
            askUser('Введите значение для "name"'),
            askUser('Введите значение для "value"')
        );
    };

    render() {
        const {data} = this.props;

        return (
            <div className="table-editor col s12">
                <div className="table-editor__table-view">
                    <TableView data={data} onSort={this.handleSort}/>
                </div>
                <div className="table-editor__options">
                    <button className="btn waves-effect waves-light"
                            onClick={this.handleOnAppendRow}>Добавить строку
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.table.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAppendRow: (name, value) => dispatch(rowAppended(name, value)),
        onSortUp: (paramName) => dispatch(colSortedUp(paramName)),
        onSortDown: (paramName) => dispatch(colSortedDown(paramName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableEditor);