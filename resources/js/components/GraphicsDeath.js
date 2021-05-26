import React from 'react';
import {Bar} from 'react-chartjs-2';
import '../../assets/css/Graphics.css';

function Graphics(props) {
    const data={
        labels: JSON.parse(JSON.stringify(props.data)),
        datasets:[
            {
                label:"N° casos ",
                fill: true,
                backgroundColor: '#F45643',
                borderColor:'#F45643',
                pointBorderColor:'#F45643',
                pointBorderWidth:1,
                pointHoverRadius:5,
                pointHoverBackgroundColor:'#F45643',
                pointHoverBorderColor:'#F45643',
                pointRadius: 1,
                pointHitRadius: 10,
                data: JSON.parse(JSON.stringify(props.data1))
            },
            {
                label:"N° nuevos casos" ,
                fill: true,
                backgroundColor: '#F7991A',
                borderColor:'#F7991A',
                pointBorderColor:'#F7991A',
                pointBorderWidth:1,
                pointHoverRadius:5,
                pointHoverBackgroundColor:'#F7991A',
                pointHoverBorderColor:'#F7991A',
                pointRadius: 1,
                pointHitRadius: 10,
                data: JSON.parse(JSON.stringify(props.data2))
            }
        ]
    }

    return (
        <div className="containerGrafica">
            <Bar data={data}/>
        </div>
    );
}

export default Graphics;
