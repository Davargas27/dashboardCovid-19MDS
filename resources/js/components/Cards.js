import React from 'react';
import {Card, Typography, CardContent, CardActions} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles= makeStyles(()=>({
    root:{
        textAlign: 'center',
        backgroundColor: '#ECF9F6'

    },
    texto:{
        fontSize: 18,
        color: '#080808'
    },
    titulo:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#080808'
    }
    }));

function Cards(props) {

    const classes=useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography  className={classes.titulo}>
                {props.titulo}
                </Typography>

                <Typography  className={classes.texto}>
                {props.texto}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Cards;
