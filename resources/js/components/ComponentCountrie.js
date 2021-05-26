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
import Button from '@material-ui/core/Button';

class ComponenteCountries extends Component {

    constructor(props) {
        super(props);
        this.state = {data: null};

        this.countries = [];

        /* Arrays para guardar data ''= Cases , R= recovered ,D= death */
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


        /* Variable global para consumo de api, cantidadData='cuantos dias desea traer en la consulta' */
        this.service = 'https://disease.sh/v3/covid-19/';
        this.cantidadData = 30;
    }

    async getData(url) {
        const res = await axios(this.service+url);

        return await res.data;
    }

    async componentDidMount() {
        if (!this.state.data) {
            /* servicio que trae todos los paises con sus respectivos datos */
            this.getData('countries/'+this.props.data).then(data =>{
                    const repos = data;
                    this.countries['cases'] = repos.cases;
                    this.countries['Ncases']= repos.todayCases;
                    this.countries['recovered'] = repos.recovered;
                    this.countries['Nrecovered']  = repos.todayRecovered;
                    this.countries['deaths']=  repos.deaths;
                    this.countries['Ndeaths']= repos.deathsPerOneMillion;
                    this.countries['test'] = repos.tests;
                    this.countries['Ntest'] = repos.testsPerOneMillion;

                    this.setState(this.countries)
                }) .catch(err => {console.log('este es el error ', err)});

            /* servicio que trae todos los casos por dias  */
            this.getData('historical?lastdays='+this.cantidadData).then(data =>{

                data.forEach(element => {
                    if(element.country == this.props.data){

                        var data = element.timeline
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
                            var total1 =(valuesC[i]) - (valuesC[i-1]);
                            total1 =((!isNaN(total1) || total1 == 'NaN')?total1:0)
                            this.new1.push(total1);

                            this.allR1.push(keysR[i]);
                            this.allR2.push(valuesR[i]);
                            var total2 =(valuesR[i]) - (valuesR[i-1]);
                            total2 =(!isNaN(total2)?total2:0)
                            this.newR1.push(total2);

                            this.allD1.push(keysD[i]);
                            this.allD2.push(valuesD[i]);
                            var total3 =(valuesD[i]) - (valuesD[i-1]);
                            total3 =(!isNaN(total3)?total3:0)
                            this.newD1.push(total3);

                            const cases = valuesC[i];
                            const Ncases = total1;
                            const recovered = valuesR[i];
                            const Nrecovered = total2;
                            const deaths =  valuesD[i];
                            const Ndeaths = total3;
                            var today = new Date(keysC[i]); var datenew =   today.getDate() + '-' + (today.getMonth() + 1) + '-' +  today.getFullYear();
                            const date =  datenew;
                            const dataA={ date, cases, Ncases, recovered ,Nrecovered,deaths,Ndeaths};
                            this.allTable.push(dataA);
                        }
                    }
                });

                this.setState(this.all1)
                this.setState(this.all2)
                this.setState(this.new1)

                this.setState(this.allR1)
                this.setState(this.allR2)
                this.setState(this.newR1)

                this.setState(this.allD1)
                this.setState(this.allD2)
                this.setState(this.newD1)

            }) .catch(err => {console.log('este es el error ', err)});
        }
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div ><br></br>
                {/* Se pinta cada uno de la grilla y se importa los repectivos js para hacer llamado y pintarlos con la data enviada */}
                <div> <Button href="/" color="primary" size="small"> VOLVER  </Button></div>
                <Grid container spacing={3}  justify = "center" alignItems="center">
                    <Grid item xs={8} >
                        <h2 align="center">{this.props.data}</h2>
                    </Grid>
                    <Grid item xs={6} sm={6} md={5} lg={5} xl={5}>
                        <h3 align="center">NER CASES PER DAY</h3>
                        <GraphicsCases data={this.all1} data1={this.all2} data2={this.new1}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={5} lg={5} xl={5}>
                        <h3 align="center">PATIENT RECOVERED PER DAY</h3>
                        <GraphicsRecovered data={this.allR1} data1={this.allR2} data2={this.newR1}/>
                    </Grid>
                    <Grid item xs={8} sm={8} md={5} lg={5} xl={5} >
                        <h3 align="center">DEATHS PER DAY</h3>
                        <GraphicsDeath data={this.allD1} data1={this.allD2} data2={this.newD1}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <hr></hr><br/>
                        <TabsHeader data={this.countries} data1={this.allTable} value={1} />
                    </Grid>
                </Grid>
            </div>

        );
    }


}

export default ComponenteCountries;



if (document.getElementById("componenteCountrie")) {
    var data = document.getElementById("componenteCountrie").getAttribute("data");
    ReactDOM.render(<ComponenteCountries data={data} />, document.getElementById("componenteCountrie"));
    }
