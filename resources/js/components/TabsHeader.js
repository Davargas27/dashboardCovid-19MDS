import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TableCountriesAll from './TableCountriesAll';
import TableDataAll from './TableDataAll';
import {Grid} from '@material-ui/core';
import Cards from './Cards';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box > {children}   </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props) {

    console.log(props.data.cases,'aqui2');
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
        {props.value == 0?(
             <Tab label="List by country" {...a11yProps(0)} />
             ) :
             <Tab label="Data" {...a11yProps(0)} />

        }
            <Tab label="Global data per day" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {props.value == 0?(
            <TabPanel value={value} index={0}>
                <Grid item xs={12} >
                    <TableCountriesAll data={props.data} />
                </Grid>
            </TabPanel>)
        :
        <TabPanel value={value} index={0}>
            <br></br>
            <Grid container spacing={1}  >
                <Grid item xs={6} xl={6}>
                    <Cards titulo="Total Cases" texto={props.data.cases}/>
                </Grid>

                <Grid item xs={6} xl={6}>
                    <Cards titulo="New Cases" texto={props.data.Ncases}/>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <Cards titulo="Total Recovered" texto={props.data.recovered}/>
                </Grid>

                <Grid item xs={6} xl={6}>
                    <Cards titulo="New Recovered" texto={props.data.recovered}/>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <Cards titulo="Total Deaths" texto={props.data.deaths}/>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <Cards titulo="New Deaths" texto={props.data.Ndeaths}/>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <Cards titulo="Total Test" texto={props.data.test}/>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <Cards titulo="New Test" texto={props.data.Ntest}/>
                </Grid>
            </Grid>
        </TabPanel>  }

      <TabPanel value={value} index={1}>
            <Grid item xs={12} >
                <TableDataAll data={props.data1} />
            </Grid>
      </TabPanel>

    </div>
  );
}
