import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import OptionsCell from './options-cell';

import './table-view.scss';

class TableView extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onSort: PropTypes.func.isRequired,
    };

    state = {
        isNameAsc: false,
        isValueAsc: false,
        sortedBy: null,
    };

    renderRows() {
        const {data} = this.props;

        return (data.map((row, index) => {
            const {name, value} = row;
            const model = {index, ...row};

            return (
                <tr key={`row_${index}`}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{value}</td>
                    <td>
                        <OptionsCell rowModel={model}/>
                    </td>
                </tr>
            );
        }));
    };

    handleOnNameSort = () => {
        this.setState(({isNameAsc}) => {
            this.props.onSort("name", isNameAsc);

            return {
                sortedBy: "name",
                isNameAsc: !isNameAsc,
            };
        });
    };

    handleOnValueSort = () => {
        this.setState(({isValueAsc}) => {
            this.props.onSort("value", isValueAsc);

            return {
                sortedBy: "value",
                isValueAsc: !isValueAsc,
            };
        });
    };

    render() {
        const {isNameAsc, isValueAsc, sortedBy} = this.state;

        return (
            <table className="table-view highlight bordered centered">
                <thead className="table-view__header">
                    <tr>
                        <th>№</th>
                        <th className="sortable" onClick={this.handleOnNameSort}>
                            {sortedBy === 'name' &&
                            <i className={cn("material-icons", {"icon-sort--asc": isNameAsc})}>sort</i>}
                            name
                        </th>
                        <th className="sortable" onClick={this.handleOnValueSort}>
                            {sortedBy === 'value' &&
                            <i className={cn("material-icons", {"icon-sort--asc": isValueAsc})}>sort</i>}
                            value
                        </th>
                        <th className="table-view__options-column">options</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
}

export default TableView;