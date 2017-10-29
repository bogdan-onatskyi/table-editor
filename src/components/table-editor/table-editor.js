import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {rowAppended, colSortedDesc, colSortedAsc} from '../../actions/table-actions';
import {askUser} from '../utils';

import TableView from './table-view/table-view';

import './table-editor.scss';

class TableEditor extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,

        onAppendRow: PropTypes.func.isRequired,
        onSortDesc: PropTypes.func.isRequired,
        onSortAsc: PropTypes.func.isRequired
    };

    handleSort = (paramName, isAsc) => {
        const {onSortDesc, onSortAsc} = this.props;
        isAsc ? onSortAsc(paramName) : onSortDesc(paramName);
    };

    handleOnAppendRow = () => {
        this.props.onAppendRow(
            askUser('Введите значение для "name"'),
            askUser('Введите значение для "value"')
        );
    };

    render() {
        return (
            <div className="table-editor col s12">
                <div className="table-editor__table-view">
                    <TableView data={this.props.data} onSort={this.handleSort}/>
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
        onSortDesc: (paramName) => dispatch(colSortedDesc(paramName)),
        onSortAsc: (paramName) => dispatch(colSortedAsc(paramName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableEditor);