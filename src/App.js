import React from "react";
import "./style.css";
import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MenuIcon from '@mui/icons-material/Menu';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import 'toastr/build/toastr.min.css';
import moment from 'moment';
import toastr from 'toastr';
///////////////////////////////////////////////////////////////////

export default function App() {
//setup
  let [title, setTitle] = React.useState('');
  let [description, setDescription] = React.useState('');
  let [deadline, setDeadline] = React.useState('');
  let [complete, setComplete] = React.useState(false);
  let [priority, setPriority] = React.useState('');
  let [taskArray, setTaskArray] = React.useState([]);
  let [open, setOpen] = React.useState(false);
  let [addB, setAddB] = React.useState(false);
  let [deleteButtonIndex, setDeleteButtonIndex] = React.useState(0);
  let [DescError, setDescErr] = React.useState(false);
  let [updateB, setUpdateB] = React.useState(false);
  let [rows, setRows] = React.useState([]);
  let [index, setIndex] = React.useState(0);
  const [error, setError] = React.useState(false);
  let [titleValidator, setTitleValidator] = React.useState('');
  let [descriptionValidator, setDescriptionValidator] = React.useState('');
  let [updateButton, showButton] = React.useState(true);
  let [date, setDate] = React.useState('');
  let [isEditing, setIsEditing] = React.useState(false);

    //open dialog
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    //close dialog
    const handleClickClosed = () => {
      setOpen(false);
    };
  
    //change title on dialog
    let changeTitle = (value) => {
      setTitle(value);
      validateTitle(value);
    };
  
    //change description on dialog
    let changeDescription = (value) => {
      setDescription(value);
      validateDescription(value);
    };
  
    //change deadline on dialog
    function changeDeadline(value) {
      setDeadline(value);
    }

}
