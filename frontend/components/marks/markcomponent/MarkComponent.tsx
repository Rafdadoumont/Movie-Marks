import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, CardHeader, Avatar, CardActions, Button } from '@mui/material';
import UserService from "../../../services/UserService";
import MovieService from "../../../services/MovieService";
import styles from "./markcomponent.module.css";
import StarIcon from '@mui/icons-material/Star';
import AvatarColor from "../../../theme/AvatarColor";
import DeleteMarkDialog from "../dialogs/DeleteMarkDialog";
import EditMarkDialog from "../dialogs/EditMarkDialog";

const MarkComponent = ({ mark, onMarkEdit, onMarkDelete }) => {
    const [user, setUser] = useState({ id: null, username: "" });
    const [timeAgo, setTimeAgo] = useState<string>("");
    const [movie, setMovie] = useState<{ title: string }>({ title: "" });
    const [loggedInUserId, setLoggedInUserId] = useState<number>(null);

    const [editMarkDialogOpen, setEditMarkDialogOpen] = useState(false);
    const [deleteMarkDialogOpen, setDeleteMarkDialogOpen] = useState(false);

    const fetchUser = async (mark) => {
        const response = await UserService.getUserByIdAsync(mark.userId);
        setUser(response.data);
    }

    const fetchMovie = async (mark) => {
        const response = await MovieService.getMovieByIdAsync(mark.movieId);
        setMovie(response.data);
    }

    const handleEditDialogClickOpen = () => {
        setEditMarkDialogOpen(true);
    };

    const handleEditDialogClickClose = () => {
        setEditMarkDialogOpen(false);
    };

    const handleDeleteDialogClickOpen = () => {
        setDeleteMarkDialogOpen(true);
    };

    const handleDeleteDialogClickClose = () => {
        setDeleteMarkDialogOpen(false);
    };

    useEffect(() => {
        setTimeAgo(getTimeAgo(mark.createdAt.toLocaleString()))
        fetchUser(mark);
        fetchMovie(mark);
        setLoggedInUserId(parseInt(sessionStorage.getItem('userId')));
    }, []);


    return (
        <>
            <EditMarkDialog mark={mark} open={editMarkDialogOpen} handleClose={handleEditDialogClickClose} onMarkEdit={onMarkEdit} />
            <DeleteMarkDialog mark={mark} open={deleteMarkDialogOpen} handleClose={handleDeleteDialogClickClose} onMarkDelete={onMarkDelete} />
            <Card className={styles.container}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ backgroundColor: AvatarColor.convert(user.username) }}>
                            {user.username[0]}
                        </Avatar>
                    }
                    title={user.username}
                    subheader={timeAgo}
                    action={
                        <Box className={styles.rating}>
                            <Typography variant="h5" component="div">{mark.rating}/10</Typography>
                            <StarIcon style={{ color: "#FAAF00" }} />
                        </Box>
                    }
                />
                <CardContent className={styles.content}>
                    <Typography variant="h5" component="div">{movie.title}</Typography>
                    <Typography className={styles.comment} style={{ maxHeight: '100px', overflowY: 'auto' }}>{mark.comment}</Typography>
                </CardContent>
                <CardActions className={styles.cardActions}>
                    {user.id === loggedInUserId &&
                        <>
                            <Button size="small" onClick={handleEditDialogClickOpen}>Edit</Button>
                            <Button size="small" onClick={handleDeleteDialogClickOpen}>Delete</Button>
                        </>
                    }
                </CardActions>
            </Card>
        </>
    );
};

function getTimeAgo(timestamp: string): string {
    const now = new Date();
    const pastTime = new Date(timestamp);
    const elapsedMinutes = Math.floor((now.getTime() - pastTime.getTime()) / (1000 * 60));

    if (elapsedMinutes < 1) {
        return "Just now";
    } else if (elapsedMinutes < 60) {
        return `${elapsedMinutes} minute${elapsedMinutes === 1 ? '' : 's'} ago`;
    } else {
        const elapsedHours = Math.floor(elapsedMinutes / 60);

        if (elapsedHours < 24) {
            return `${elapsedHours} hour${elapsedHours === 1 ? '' : 's'} ago`;
        } else {
            const elapsedDays = Math.floor(elapsedHours / 24);
            return `${elapsedDays} day${elapsedDays === 1 ? '' : 's'} ago`;
        }
    }
}
export default MarkComponent;