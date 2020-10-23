import React, { Component } from 'react';
import Countries from './components/Countries/Countries'
import Header from './components/Header/Header'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCoutries: [],
      filteredPopulation: 0,
      filter: ''
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(({name, numericCode, flag, population}) =>{
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population
      };
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);

    this.setState({
      allCountries,
      filteredCoutries: Object.assign([], allCountries),
      filteredPopulation,
    });
  }

  calculateTotalPopulationFrom = (countries) => {
    return countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
  }

  handleChangeFilter = (newText) => {
    console.log(newText);
    this.setState({
      filter: newText,
    });

    const filterLowerCase = newText.toLowerCase();

    const filteredCoutries = this.state.allCountries.filter((country) => {
     return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(filteredCoutries);

    this.setState({
      filteredCoutries,
      filteredPopulation,
    });
  };

  render() {
    const { filteredCoutries, filter, filteredPopulation } = this.state;

    return(
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header filter={filter} countryCount={filteredCoutries.length} totalPopulation={filteredPopulation} onChangeFilter={this.handleChangeFilter}/>
        <Countries countries={filteredCoutries}/>
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  }
}