import React from 'react';
import {Bar} from 'react-chartjs-2';
import '../../assets/css/Graphics.css';

function Graphics(props) {
    console.log(props.data,'aca');
    console.log(props.data1,'aqui');
    const data={
        labels: JSON.parse(JSON.stringify(props.data)),
        tittle: JSON.parse(JSON.stringify(props.data)),
        datasets:[
            {
                label:"N° casos ",
                fill: true,
                backgroundColor: 'rgba(73,155,234,1)',
                borderColor:'rgba(73,155,234,1)',
                pointBorderColor:'rgba(73,155,234,1)',
                pointBorderWidth:1,
                pointHoverRadius:5,
                pointHoverBackgroundColor:'rgba(73,155,234,1)',
                pointHoverBorderColor:'rgba(73,155,234,1)',
                pointRadius: 1,
                pointHitRadius: 10,
                data: JSON.parse(JSON.stringify(props.data1))
            },
            {
                label:"N° nuevos casos" ,
                fill: true,
                backgroundColor: '#FCE607',
                borderColor:'#FCE607',
                pointBorderColor:'#FCE607',
                pointBorderWidth:1,
                pointHoverRadius:5,
                pointHoverBackgroundColor:'#FCE607',
                pointHoverBorderColor:'#FCE607',
                pointRadius: 1,
                pointHitRadius: 10,
                data: JSON.parse(JSON.stringify(props.data2))
            }
        ]

    }



    return (
        <div className="containerGrafica">
            <Bar data={data}  />
        </div>
    );
}

export default Graphics;
