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
            backgroundColor: '#53EC4C',
            borderColor:'#53EC4C',
            pointBorderColor:'#53EC4C',
            pointBorderWidth:1,
            pointHoverRadius:5,
            pointHoverBackgroundColor:'#53EC4C',
            pointHoverBorderColor:'#53EC4C',
            pointRadius: 1,
            pointHitRadius: 10,
            data: JSON.parse(JSON.stringify(props.data1))
            },
            {
                label:"N° nuevos casos" ,
                fill: true,
                backgroundColor: '#B6EAE0',
                borderColor:'#B6EAE0',
                pointBorderColor:'#B6EAE0',
                pointBorderWidth:1,
                pointHoverRadius:5,
                pointHoverBackgroundColor:'#B6EAE0',
                pointHoverBorderColor:'#B6EAE0',
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
