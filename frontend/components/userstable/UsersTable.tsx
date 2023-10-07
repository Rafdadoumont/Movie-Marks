import { useEffect, useState } from 'react';
import styles from './userstable.module.css';
import FollowService from '../../services/FollowService';
import UserService from '../../services/UserService';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import AvatarColor from "../../theme/AvatarColor";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function UsersTable({ users }) {
    const [currentUser, setCurrentUser] = useState({ id: null, username: "", password: "", marks: [], followedBy: [], following: [] });
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredUserId, setHoveredUserId] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await UserService.getUserByIdAsync(parseInt(sessionStorage.getItem('userId')));
            setCurrentUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
        };
        fetchData();
    }, []);

    const handleFollow = async (userIdToFollow) => {
        await FollowService.addToFollowing(Number(userIdToFollow))
        await fetchUser();
        window.dispatchEvent(new CustomEvent('followedOrUnfollowed'));
    }

    const handleUnfollow = async (userIdToUnfollow) => {
        await FollowService.removeFromFollowing(Number(userIdToUnfollow))
        await fetchUser();
        window.dispatchEvent(new CustomEvent('followedOrUnfollowed'));
    }


    return (
        <div className={styles.container}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {users.map((user) => {
                  const isFollowing = currentUser.following.some(following => following.id === user.id);
                  const isHovered = hoveredUserId === user.id;
    
                  return (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row" style={{ padding: 10, paddingRight: 10, }}>
                        <Avatar sx={{ backgroundColor: AvatarColor.convert(user.username) }}>
                          {user.username[0]}
                        </Avatar>
                      </TableCell>
                      <TableCell align="left" style={{ paddingLeft: 10, width: '300px' }}>{user.username}</TableCell>
                      <TableCell style={{ padding: 0, width: 130 }} align="center"
                        onMouseEnter={() => setHoveredUserId(user.id)}
                        onMouseLeave={() => setHoveredUserId(null)}
                      >
                        {isFollowing ?
                          isHovered ?
                            <Button variant="contained" sx={{":hover": { bgcolor: "#DA3837"}}} className={styles.unfollowButton}  onClick={() => { handleUnfollow(user.id) }}>Unfollow</Button>
                            :
                            <Typography variant="body1" className={styles.followingText}>Following</Typography>
                          :
                          <Button variant="contained" className={styles.followButton} onClick={() => { handleFollow(user.id) }}>Follow</Button>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    }

export default UsersTable
