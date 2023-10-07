import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Rating } from "@mui/material";
import MarkService from "../../../services/MarkService";
import { useState } from "react";


const EditMarkDialog = ({ mark, open, handleClose, onMarkEdit }) => {
    const [editMark, setEditMark] = useState(mark);

    const handleEditMark = async () => {
        await MarkService.updateMarkAsync(editMark.id, editMark.rating, editMark.comment);
        onMarkEdit();
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Mark</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please edit your mark below.
                </DialogContentText>
                <Rating
                    name="rating"
                    sx={{ borderColor: '#FAAF00' }}
                    defaultValue={mark.rating} max={10}
                    value={editMark.rating}
                    onChange={(event, newRating) => setEditMark({ ...mark, rating: newRating })}
                />
                <TextField
                    margin="dense"
                    id="comment"
                    label="Comment"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={editMark.comment}
                    onChange={event => setEditMark({ ...editMark, comment: event.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEditMark}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditMarkDialog;
