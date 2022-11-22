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
  let [priority, setPriority] = React.useState('');
  let [taskArray, setTaskArray] = React.useState([]);
  let [open, setOpen] = React.useState(false);
  let [addB, setAddB] = React.useState(false);
  let [index, setIndex] = React.useState(0);
  const [error, setError] = React.useState(false);
  let [titleValidator, setTitleValidator] = React.useState('');
  let [descriptionValidator, setDescriptionValidator] = React.useState('');
  let [isEditing, setIsEditing] = React.useState(false);

    //open dialog
    const dialogOpen = () => {
      setOpen(true);
    };
  
    //close dialog
    const dialogClose = () => {
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

    //checkbox change for complete
    let changer = (index) => {
      let clickedId = -1;
      clickedId = taskArray.findIndex(checkId);
    
    function checkId(x){
      return (clickedId == -1 && x.index === index)
    }
      setTaskArray((array) =>{
        let updateArray = [...array];
        updateArray[clickedId].isComplete = !array[clickedId].isComplete;
        return updateArray;
      });
    };

    //submit function (add)
  let submit = () => {
    if (validateTitle(title) || validateDescription(description)) {
      errorMsgPost();
      return;
    }
    TaskAdder();
    dialogClose();
    toastr.success('Task added successfully');
  };

  //submit function (update)
  let updateSubmit = () => {
    if (validateDescription(description)) {
      errorMsgPost();
      return;
    }
    TaskAdder();
    dialogClose();
    toastr.success('Task updated successfully');
  };

  //Add a task
  function TaskAdder() {
    let data = {
      title,
      description,
      deadline,
      priority,
      isComplete: false,
      index,
    };

    if (addB) {
      taskArray.push(data);
    } else {
      taskArray[index] = data;
    }
    setIndex(taskArray.length);
    setDescription('');
    setTitle('');
    setPriority('');
    setDeadline('');
  }

  //update a task
  function updateTasks(index) {
    let clickedId = -1;
    clickedId = taskArray.findIndex(checkId);
    
    function checkId(x){
      return (clickedId == -1 && x.index === index)
    }
    index = clickedId;
    let updater = taskArray[index];
    setAddB(false);
    setDescription(updater.description);
    setTitle(updater.title);
    setPriority(updater.priority);
    setDeadline(updater.deadline);
    setIndex(updater.index);
  }

  //cancel filling in a task
  const cancelEntry = () => {
    let data = {
      title,
      description,
      deadline,
      priority,
      isComplete: false,
      index,
    };
    setDescription('');
    setTitle('');
    setPriority('');
    setDeadline('');
  };

  //delete a task
  const deleteTasks = (index) => {
    let clickedId = -1;
      clickedId = taskArray.findIndex(checkId);
    
    function checkId(x){
      return (clickedId == -1 && x.index === index)
    }
    setTaskArray((array) => {
      let newTaskArray = [...array];
      newTaskArray.splice(clickedId, 1);
      setTaskArray([...newTaskArray]);
      return newTaskArray;
    });
    toastr.success('Task deleted successfully');
  };

  //validation
  let validateTitle = (value) => {
    setError(false);
    let errors = [];
    if (!value) {
      errors.push('Title is Required!');
      setError(true);
    }
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].title === value) {
        errors.push('Title is not unique!');
        setError(true);
      }
    }
    let results = errors.join();
    setTitleValidator(results);
    return results;
  };
//validates description
let validateDescription = (value) => {
  //setError(false);
  let errors = [];
  if (!value) {
    errors.push('Description is Required!');
    setError(true);
  }else{setError(false)}
  let results = errors.join();
  setDescriptionValidator(results);
  return results;
};

/*validates date
let validateDate = (value) => {
  setError(false);
  let errors = [];
  if (!value) {
    errors.push('Date is Required!');
    setError(true);
  }
  let results = errors.join();
  setDateValidator(results);
  return results;
};
*/

//error message
  function errorMsgPost(){
    toastr.error('There was an error with your submission');
  }

  //create UI
  return (
    <>
      <Dialog open={open} onClose={dialogClose}>
        {isEditing ? (
          <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
            <EditRoundedIcon />
            Edit Task
          </DialogTitle>
        ) : (
          <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
            <AddCircleIcon />
            Add Task
          </DialogTitle>
        )}
        <br />
          <DialogContent>
            <TextField
              error={error}
              sx={{ width: 1 }}
              id="titleinput"
              label="Title"
              placeholder="Type a Title..."
              helperText={titleValidator}
              value={title}
              style={{visibility: isEditing ? 'hidden' : 'visible' }}
              onChange={(e) => changeTitle(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              error={error}
              sx={{ width: 1 }}
              id="descriptioninput"
              label="Description"
              placeholder="Type a Description..."
              helperText={descriptionValidator}
              value={description}
              onChange={(e) => changeDescription(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              type="date"
              defaultValue="01/01/2022"
              id="dateInput"
              value={deadline}
              onChange={(e) => changeDeadline(e.target.value)}
              label="Deadline"
              style={{ display: 'block' }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <br />
            <br />
            Priority
            <br />
            <RadioGroup
              row
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="med"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Deadline"
                value={deadline}
                onChange={(e) => {}}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
        {isEditing ? (
          <DialogActions sx={{ bgcolor: 'white' }}>
            <Button
              onClick={() => {
                updateSubmit();
                
              }}
              variant="contained"
              sx={{ width: 100 }}
              autoFocus
            >
              <EditRoundedIcon />
              Edit
            </Button>

            <Button
              onClick={dialogClose}
              onClick={() => {
                dialogClose();
              }}
              variant="contained"
              sx={{ bgcolor: 'red', width: 100 }}
              autoFocus
            >
              <DoNotDisturbAltRoundedIcon fontSize="small" />
              CANCEL
            </Button>
          </DialogActions>
        ) : (
          <DialogActions sx={{ bgcolor: 'white' }}>
            <Button
              onClick={() => {
                submit();
                
              }}
              variant="contained"
              sx={{ width: 100 }}
              autoFocus
            >
              <AddCircleIcon />
              Add
            </Button>

            <Button
              onClick={() => {
                cancelEntry();
                dialogClose();
              }}
              variant="contained"
              sx={{ bgcolor: 'red', width: 100 }}
              autoFocus
            >
              <DoNotDisturbAltRoundedIcon fontSize="small" />
              CANCEL
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <Card sx={{ margin: '-8px' }}>
        <CardHeader
          sx={{ bgcolor: 'primary.dark', color: 'white' }}
          title={
            <>
              <MenuIcon />
              FRAMEWORKS
            </>
          }
          style={{ textAlign: 'center' }}
          action={
            <>
              <Button
                variant="contained"
                onClick={() => {
                  dialogOpen();
                  setIsEditing(false);
                }}
                sx={{ width: 100, marginRight: '7px' }}
              >
                <AddCircleIcon />
                &nbsp; ADD
              </Button>
            </>
          }
        ></CardHeader>
        <CardContent sx={{ bgcolor: 'white' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: 'gray' }}>
                    Title
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'gray' }}>
                    Description
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'gray' }}>
                    Deadline
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'gray' }}>
                    Priority
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'gray' }}>
                    Is Complete
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'gray' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {' '}
                {taskArray.map((data) => (
                  <TableRow key={data.index}>
                    <TableCell align="center">{data.title}</TableCell>
                    <TableCell align="center">{data.description}</TableCell>
                    <TableCell align="center">
                      {moment(data.deadline).format('MM/DD/YY')}
                    </TableCell>
                    <TableCell align="center">{data.priority}</TableCell>
                    <TableCell align="center">
                      <div>
                        {/*update button*/}
                        {data.isComplete ? (
                          <div>
                            <Checkbox
                              defaultChecked
                              onClick={() => changer(data.index)}
                            />
                          </div>
                        ) : (
                          <div>
                            <Checkbox
                              onClick={() => changer(data.index)}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        {/*update button*/}
                        {!data.isComplete ? (
                          <div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                updateTasks(data.index);
                                dialogOpen();
                                setIsEditing(true); 
                              }}
                              sx={{ width: 100 }}
                              id="update"
                            >
                              <EditRoundedIcon />
                              &nbsp;Update
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                        {/*delete button*/}
                        <div>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => deleteTasks(data.index)}
                            sx={{ bgcolor: 'red', width: 100 }}
                          >
                            <DoNotDisturbAltRoundedIcon />
                            &nbsp;Delete
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}
