import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Customer";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import CustomersForm from "./CustomersForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { DataGrid } from '@mui/x-data-grid'; 
import { useDemoData } from '@mui/x-data-grid-generator';

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'customerName',
      headerName: 'Cutomer Name',
      width: 150, 
    },
    {
      field: 'className',
      headerName: 'Class',
      width: 100,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 160,
     
    },{
        field: 'comment',
        headerName: 'Comment',
        width: 160,
       
      },
  ];
  
 
const CustomersData = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0);
    const [selectedRows, setSelectedRows] = useState();
 
    useEffect(() => {
        props.fetchAllCustomer()
    }, [])//componentDidMount
    const clearselectedrows = () => {
        setSelectedRows([{
            id:  '',
            customerName: '',
            className: '',
            phone: '',
            email: '',
            comment: ''
        }]);
    }  
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteCustomer(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
        clearselectedrows();
    }
    return (
        <>
          <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
    //    checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = props.CustomerStoreList.filter((row) =>
            selectedIDs.has(row.id),
          );
          setSelectedRows(selectedRows);
        }} 
        rows={props.CustomerStoreList}
        columns={columns}
         />
         {console.log(selectedRows)}
         </div>
             <Grid container>
                
                
                <Grid item xs={6}>
                    <CustomersForm {...({ currentId, setCurrentId })} selectedRows={selectedRows} 
                    clearselectedrows={clearselectedrows} onDelete={onDelete} />
                </Grid>
            </Grid>
        
        </>
    
    );
}

const mapStateToProps = state => ({
    CustomerStoreList: state.CustomerStore.list
})

const mapActionToProps = {
    fetchAllCustomer: actions.fetchAll,
    deleteCustomer: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CustomersData));