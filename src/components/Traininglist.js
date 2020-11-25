import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { BottomNavigation } from '@material-ui/core';


function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);

useEffect(() => {
    getTrainings();
}, [])

const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
    .then(response => response.json())
    .then(data => setTrainings(data.content))
    .catch(err => console.error(err))
}

const columns = [
    {headerName: 'Date', field: 'date', sortable: true, filter: true},
    {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
    {headerName: 'Activity', field: 'activity', sortable: true, filter: true}
]

    return (
        <div className="ag-theme-material" style={{height: '700px', width: '600px', margin: 'auto'}}>
        <AgGridReact
        columnDefs={columns}   
        rowData={trainings}>
   
        </AgGridReact>
        </div>
    );
  }

export default Traininglist;