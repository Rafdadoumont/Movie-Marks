import styles from './sidebar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthService from '../../services/AuthService';
import Profile from './profile/profile';
import { List, ListItem, Button, ListItemButton, Card, ListItemText, ListItemIcon } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/Search';


function Sidebar({user}) {
    const { push } = useRouter();

    const handleSignOut = () => {
        AuthService.signOut();
        push('/login');
    }

    return (

        <Card className={styles.sidebar}>
            <h1 className={styles.movieMarks}>MovieMarks</h1>
            <Profile user={user} />
            <List component="nav">
                <ListItem>
                    <Link href="/" className={styles.link}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/search"className={styles.link}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary="Search" />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Button variant="contained" className={styles.logoutButton} onClick={() => { handleSignOut() }}>Sign Out</Button>
        </Card>

    )
}

export default Sidebar;