import React, { useState, useEffect } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Traininglist from './Traininglist';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PersonIcon from '@material-ui/icons/Person';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Customerlist from './Customerlist';
import MyCalendar from './Calendar';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1600,
    },
  });

function TabApp(props) {
 const classes = useStyles();
const [value, setValue] = useState('one');

const handleChange = (event, value) => {
    setValue(value);
};

return(

<div>
<Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PersonIcon />} value="one" label="Customers" />
        <Tab icon={<DirectionsRunIcon />} value="two" label="Trainings"  />
        <Tab icon={<DateRangeIcon />} value="three" label="Calendar" />
      </Tabs>
    </Paper>
    {value === 'one' && <Customerlist />}
    {value === 'two' && <Traininglist />}
    {value === 'three' && <MyCalendar />}
    </div>
);
}

export default TabApp;