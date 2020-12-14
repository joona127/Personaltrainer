import React, { useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { makeStyles } from '@material-ui/core/styles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import getTrainings from './Traininglist';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Customerlist() {
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
    getCustomers();
}, [])


const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}

const deleteCustomer = (url) => {
    if (window.confirm('Are you sure?')) {
    fetch(url, {
        method: 'DELETE'
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
    }
}

const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(newCustomer)
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    .catch(err => console.error(err))
}

const updateCustomer = (url, customer) => {
  fetch(url, {
      method: 'PUT',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(customer)
  })
  .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
  .then(_ => setOpen(true))
  .catch(err => console.error(err))
}

const addTraining = (newTraining) => {
  fetch('https://customerrest.herokuapp.com/api/trainings', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTraining)
  })
  .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
    .catch(err => console.error(err))
}

const closeSnackbar = () => {
    setOpen(false);
}

const columns = [
//  {headerName: "Add training",
// 			render: trainingRow => (
// 				<AddTraining
// 					saveTraining={addTraining}
// 					customerId={trainingRow.links[0].href}
// 				/>
// 			),
// 			sorting: false
// 		},
   {
     headerName: 'Add training', field: 'links[0].href',
    cellRendererFramework: params => (
       <AddTraining
         addTraining={addTraining}
         params={params}>
         link={params.data.links[0].href} 

         </AddTraining>
       )
    },
  
  {headerName: '', field: 'links[0].href', 
     width: 60, 
      cellRendererFramework: params => 
     <EditCustomer updateCustomer={updateCustomer} params={params} />
    },
    {
        headerName: '', 
        field: 'links[0].href', 
        width: 60, 
        cellRendererFramework: params => 
        <IconButton aria-label="delete" className={classes.margin}
            onClick={() => deleteCustomer(params.data.links[0].href)}>
          <DeleteIcon />
        </IconButton>
      },
    {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
    {headerName: 'Lastname', field: 'lastname', sortable: true, filter: true},
    {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true},
    {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
    {headerName: 'City', field: 'city', sortable: true, filter: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    
   
];


return (
  <div>
      <AddCustomer addCustomer={addCustomer} />
      
    <div className="ag-theme-material" style={{height: '700px', width: '110%', margin: 'auto'}}>
     <AgGridReact
      ref={gridRef}
      suppressCellSelection={true}
      onGridReady={ params => {
       gridRef.current = params.api
      }}
     columnDefs={columns}   
     rowData={customers}>

     </AgGridReact>
     <Snackbar 
        open={open}
        autoHideDuration={3000}>
        <Alert onClose={closeSnackbar} severity="success">
          Customer deleted succesfully!
        </Alert>

        </Snackbar>
      </div>
     </div>
     
     
     );
}


export default Customerlist;