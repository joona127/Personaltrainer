import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from 'moment';

export default function Addtraining(props) {
	const [open, setOpen] = useState(false);
	const [trainings, setTrainings] = useState({
		activity: "",
		date: "",
		duration: "",
		customer: props.link,
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const inputChanged = (event) => {
		setTrainings({ ...trainings, [event.target.name]: event.target.value });
	};


	const handleSave = () => {
		let training = trainings;
		console.log(training)
		training.date = moment().toISOString(training.date);
		console.log(training);
		props.addTraining(training);
		handleClose();
		setTrainings({activity: '', date: '', duration: '', customer: props.link});
	};

	return (
		<div>
			<Button
				variant="outlined"
				color="primary"
				size="small"
				onClick={handleClickOpen}
			>
				Add training
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">New Training</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						name="activity"
						value={trainings.activity}
						onChange={inputChanged}
						label="Activity"
						fullWidth
					/>
					<TextField
						id="date"
						name="date"
						type="datetime-local"
						value={trainings.date}
						onChange={inputChanged}
						label="Date"
						fullWidth
						InputLabelProps={{
							shrink: true,
						  }}
					/>
					<TextField
					    type="number"
						margin="dense"
						name="duration"
						value={trainings.duration}
						onChange={inputChanged}
						label="Duration"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSave} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

