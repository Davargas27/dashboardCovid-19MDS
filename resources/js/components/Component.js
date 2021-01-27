import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {makeStyles} from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';
import '../../assets/css/Dashboard.css';
import PublicIcon from '@material-ui/icons/Public';
import {Grid} from '@material-ui/core';
import GraphicsCases from './GraphicsCases';
import GraphicsRecovered from './GraphicsRecovered';
import GraphicsDeath from './GraphicsDeath';
import TableCountries from './TableCountries';
import TabsHeader from './TabsHeader';


class Componente extends Component {

    constructor(props) {
        super(props);
        this.state = {data: null};
        this.countries = [];
        this.countriesAll = [];
        this.all1 = [];
        this.all2 = [];
        this.new1 = [];

        this.allR1 = [];
        this.allR2 = [];
        this.newR1 = [];

        this.allD1 = [];
        this.allD2 = [];
        this.newD1 = [];
        this.allTable = [];


        this.service = 'https://disease.sh/v3/covid-19/';
    }

    async getData(url) {
        const res = await axios(this.service+url);
        return await res.data; // (Or whatever)
    }

    async componentDidMount() {
        if (!this.state.data) {
            /* servicio que trae todos los paises con sus respectivos datos */
            this.getData('countries').then(data =>{
                    const repos = data;
                    for (let i = 0; i < repos.length; i++) {

                        const name = repos[i]['country'];
                        const cases = repos[i]['cases'];
                        const Ncases = repos[i]['todayCases'];
                        const recovered = repos[i]['recovered'];
                        const Nrecovered = repos[i]['todayRecovered'];
                        const deaths =  repos[i]['deaths'];
                        const Ndeaths = repos[i]['deathsPerOneMillion'];
                        const test = repos[i]['tests'];
                        const Ntest = repos[i]['testsPerOneMillion'];
                        const active = repos[i]['active'];
                        const critical = repos[i]['critical'];
                        var today = new Date(repos[i]['updated']); var datenew =   today.getDate() + '-' +(today.getMonth() + 1) + '-' + today.getFullYear() ;
                        const date =  datenew;
                        const dataA={ name, cases, Ncases, recovered, Nrecovered ,deaths,Ndeaths,test,Ntest,active,critical,date};
                        const dataAll={ name};
                        this.countries.push(dataA);
                        this.countriesAll.push(dataAll);
                    }
                    this.setState(this.countries)
                }) .catch(err => {console.log('este es el error ', err)});

            /* servicio que trae todos los casos por dias  */
            this.getData('historical/all?lastdays=15').then(data =>{
                /* grafica nuevos casos */
                    var keysC=Object.keys(data.cases);
                    var valuesC=Object.values(data.cases);
                /* grafica  casos recuperados */
                    var keysR=Object.keys(data.recovered);
                    var valuesR=Object.values(data.recovered);
                /* grafica  casos de muerte */
                    var keysD=Object.keys(data.deaths);
                    var valuesD=Object.values(data.deaths);
                    for (let i = 0; i < valuesC.length; i++) {

                        this.all1.push(keysC[i]);
                        this.all2.push(valuesC[i]);
                        var total1 =(valuesC[i]) - (valuesC[i-1]); this.new1.push(total1);
                        total1 =(!isNaN(total1)?total1:0)

                        this.allR1.push(keysR[i]);
                        this.allR2.push(valuesR[i]);
                        var total2 =(valuesR[i]) - (valuesR[i-1]); this.newR1.push(total2);
                        total2 =(!isNaN(total2)?total2:0)

                        this.allD1.push(keysD[i]);
                        this.allD2.push(valuesD[i]);
                        var total3 =(valuesD[i]) - (valuesD[i-1]); this.newD1.push(total3);
                        total3 =(!isNaN(total3)?total3:0)

                        const cases = valuesC[i];
                        const Ncases = total1;
                        const recovered = valuesR[i];
                        const Nrecovered = total2;
                        const deaths =  valuesD[i];
                        const Ndeaths = total3;
                        var today = new Date(keysC[i]); var datenew =   today.getDate() + '-' +today.getFullYear() + '-' + (today.getMonth() + 1);
                        const date =  datenew;
                        const dataA={ date, cases, Ncases, recovered ,Nrecovered,deaths,Ndeaths};
                        this.allTable.push(dataA);
                    }

            }) .catch(err => {console.log('este es el error ', err)});
        }
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div >
                <Grid container spacing={3}  justify = "center" alignItems="center">
                    <Grid item xs={8} >
                        <h3 align="center">COUNTRIES</h3>
                        <TableCountries data={this.countriesAll} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                        <h3 align="center">NER CASES PER DAY</h3>
                        <GraphicsCases data={this.all1} data1={this.all2} data2={this.new1}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                        <h3 align="center">PATIENT RECOVERED PER DAY</h3>
                        <GraphicsRecovered data={this.allR1} data1={this.allR2} data2={this.newR1}/>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} >
                        <h3 align="center">DEATHS PER DAY</h3>
                        <GraphicsDeath data={this.allD1} data1={this.allD2} data2={this.newD1}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <hr></hr><br/>
                        <TabsHeader data={this.countries} data1={this.allTable} value={0}/>
                    </Grid>
                </Grid>
            </div>

        );
    }


}

export default Componente;

if (document.getElementById('componente')) {
    ReactDOM.render(<Componente />, document.getElementById('componente'));
}
