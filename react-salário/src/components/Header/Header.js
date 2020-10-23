import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers';


export default class Header extends Component {
    handelInputChange = (event) => {
        const newText = event.target.value

        this.props.onChangeFilter(newText);
    };

    render() {
        const { filter, countryCount, totalPopulation } = this.props;
        return (
            <div>
                <p>Salário Bruto</p>
                <input placeholder="Valor do salário" type="number"/>
            </div>
        )
    }
}
