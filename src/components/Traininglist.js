import React, { useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { makeStyles } from '@material-ui/core/styles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Moment from "react-moment";
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);
    const [customers, setCustomers] = React.useState([]);
    const [open, setOpen] = React.useState(false);

  const gridRef = useRef();

 const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

useEffect(() => {
    getTrainings();
}, [])

const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
}


const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
    fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: 'DELETE'
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
    }
}

const closeSnackbar = () => {
    setOpen(false);
}


const columns = [
    {
        headerName: 'Delete', 
        width: 120, 
        cellRendererFramework: params => 
        <IconButton aria-label="delete" className={classes.margin}
            onClick={() => deleteTraining(params.data.id)}>
          <DeleteIcon />
        </IconButton>
      },
    {headerName: 'Date', field: 'date', sortable: true, filter: true,
    cellRendererFramework: params => (
        <Moment format="DD/MM/YYYY HH:mm">{params.date}</Moment>)},
    {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
    {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
    {headerName: 'Customer', field: 'customer', sortable: true, filter: true,
      // valueGetter:
      //           function sumField(params) {
      //               console.log(params)
      //               return params.data.customer.firstname + ' ' + params.data.customer.lastname
                 }
      //   },
    
]



    return (
        <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
        <AgGridReact
        ref={gridRef}
        suppressCellSelection={true}
        onGridReady={ params => {
        gridRef.current = params.api
        }}
        columnDefs={columns}   
        rowData={trainings}>
        </AgGridReact>
      <Snackbar 
        open={open}
        autoHideDuration={3000}>
        <Alert onClose={closeSnackbar} severity="success">
          Training deleted succesfully!
        </Alert>

        </Snackbar>
      </div>
   
        
    );
  }

export default Traininglist;