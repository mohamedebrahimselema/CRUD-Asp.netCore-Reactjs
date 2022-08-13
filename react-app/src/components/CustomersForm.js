import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Customer";
import { useToasts } from "react-toast-notifications";




const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})



const CustomersForm = ({selectedRows,onDelete,clearselectedrows, classes, ...props }) => {
    var initialFieldValues = {
        id:  '',
        customerName: '',
        className: '',
        phone: '',
        email: '',
        comment: ''
    }
  
    const { addToast } = useToasts()
 
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('customerName' in fieldValues)
            temp.cutomerName = fieldValues.customerName ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This field is required."
        if ('comment' in fieldValues)
            temp.comment = fieldValues.comment ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)
    useEffect(() => {
        console.log(selectedRows);
        if(selectedRows != undefined && selectedRows.length > 0){
            setValues(selectedRows[0]);
            if(selectedRows[0].id != "" && selectedRows[0].id != undefined){
                setDisable(true);
            }else{
                setDisable(false);
            }
        }
    }, [selectedRows]);
    const inputLabel = React.useRef(null);
    const [disable, setDisable] = useState(false);


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createCustomer(values, onSuccess)
            else
                props.updateCustomer(props.currentId, values, onSuccess)
        }
    }
    const clear = ()=>{
        setValues({});
        console.log(values);
        clearselectedrows();
    }
    const deleteRow = () =>{
        onDelete (selectedRows[0].id);
    }
    const updateRow = () =>{
        props.updateCustomer (selectedRows[0].id,values);
    }

    useEffect(() => {
        if (props.selectedRows != 0) {
            setValues({
                ...props.CustomerStoreList.find(x => x.id == selectedRows[0].id)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <TextField
                        name="customerName"
                        variant="outlined"
                        label="Customer Name"
                        value={values.customerName}
                        onChange={handleInputChange}
                        {...(errors.customerName && { error: true, helperText: errors.customerName })}
                    />
                    <TextField
                    name="className"
                    variant="outlined"
                    label="className"
                    value={values.className}
                    onChange={handleInputChange}
                    {...(errors.className && { error: true, helperText: errors.className })}
                      />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="phone"
                        variant="outlined"
                        label="Phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        {...(errors.phone && { error: true, helperText: errors.phone })}
                    />
                    <TextField
                        name="comment"
                        variant="outlined"
                        label="Comment"
                        value={values.comment}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                            disabled={disable}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={clear}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={deleteRow}
                            disabled={!disable}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            type="submit"
                            disabled={!disable}
                            onClick={updateRow}
                        >
                            Update
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    CustomerStoreList: state.CustomerStore.list
})

const mapActionToProps = {
    createCustomer: actions.create,
    updateCustomer: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CustomersForm));