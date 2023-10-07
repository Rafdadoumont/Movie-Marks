import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import MarkService from "../../../services/MarkService";

const DeleteMarkDialog = ({ mark, open, handleClose, onMarkDelete }) => {

    const handleDeleteMark = async () => {
        await MarkService.deleteMarkAsync(mark.id);
        onMarkDelete();
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this mark?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDeleteMark}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteMarkDialog;
