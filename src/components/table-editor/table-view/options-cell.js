import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ActionButton from './action-button';
import {rowEdited, rowInserted, rowMovedUp, rowMovedDown, rowDeleted} from '../../../actions/table-actions';
import {askUser} from '../../utils';

class OptionsCell extends PureComponent {
    static propTypes = {
        rowModel: PropTypes.shape({
            index: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
        onEditRow: PropTypes.func.isRequired,
        onInsertRow: PropTypes.func.isRequired,
        onMoveUpRow: PropTypes.func.isRequired,
        onMoveDownRow: PropTypes.func.isRequired,
        onDeleteRow: PropTypes.func.isRequired
    };

    handleOnEditRowClick = () => {
        const {rowModel, onEditRow} = this.props;
        const {index, name, value} = rowModel;

        onEditRow(
            index,
            askUser('Введите новое значение для "name"', name),
            askUser('Введите новое значение для "value"', value)
        );
    };

    handleOnInsertRowClick = () => {
        const {rowModel, onInsertRow} = this.props;

        onInsertRow(
            rowModel.index,
            askUser('Введите значение для "name"'),
            askUser('Введите значение для "value"')
        );
    };


    handleOnDeleteRowClick = () => {
        if (!confirm("Вы уверены, что хотите удалить текущую строку")) return;

        const {rowModel, onDeleteRow} = this.props;
        onDeleteRow(rowModel.index);
    };

    handleOnMoveUpRowClick = () => {
        const {rowModel, onMoveUpRow} = this.props;
        onMoveUpRow(rowModel.index);
    };

    handleOnMoveDownRowClick = () => {
        const {rowModel, onMoveDownRow} = this.props;
        onMoveDownRow(rowModel.index);
    };

    render() {
        return (
            <div className="option-buttons">
                <div className="fixed-action-btn horizontal">
                    <a className="btn-floating btn-large waves-effect waves-light">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul>
                        <li>
                            <ActionButton title="Редактировать текущую строку" icon="edit"
                                          onClick={this.handleOnEditRowClick}/>
                        </li>
                        <li>
                            <ActionButton title="Вставить строку" icon="add"
                                          onClick={this.handleOnInsertRowClick}/>
                        </li>
                        <li>
                            <ActionButton title="Переместить текущую строку вверх" icon="arrow_upward"
                                          onClick={this.handleOnMoveUpRowClick}/>
                        </li>
                        <li>
                            <ActionButton title="Переместить текущую строку вниз" icon="arrow_downward"
                                          onClick={this.handleOnMoveDownRowClick}/>
                        </li>
                        <li>
                            <ActionButton title="Удалить текущую строку" icon="delete"
                                          onClick={this.handleOnDeleteRowClick}/>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onEditRow: (i, name, value) => dispatch(rowEdited(i, name, value)),
        onInsertRow: (i, name, value) => dispatch(rowInserted(i, name, value)),
        onMoveUpRow: (i) => dispatch(rowMovedUp(i)),
        onMoveDownRow: (i) => dispatch(rowMovedDown(i)),
        onDeleteRow: (i) => dispatch(rowDeleted(i))
    };
}

export default connect(null, mapDispatchToProps)(OptionsCell);