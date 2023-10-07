import React, { useState, useEffect, useContext, createContext } from 'react';
import UserService from '../../services/UserService';
import FollowService from '../../services/FollowService';
import Sidebar from '../../components/sidebar/sidebar';
import styles from './search.module.css';
import { useRouter } from 'next/router';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, TextField } from '@mui/material';
import { Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import UsersTable from '../../components/userstable/UsersTable';
import PageTitle from '../../components/pagetitle/PageTitle';
import { AxiosResponse } from 'axios';

const Search: React.FC = () => {
    const { push } = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ id: null, username: '', password: '', marks: [], followedBy: [], following: [] });

    const handleSubmit = async (event) => {
        event.preventDefault();
        var response: AxiosResponse;
        if (searchTerm.length === 0) {
            response = await UserService.getAllUsersAsync();
            setUsers(response.data);
        } else {
            response = await UserService.searchUsersAsync(searchTerm);
            const userId = sessionStorage.getItem('userId');
            const filteredUsers = response.data.filter((user) => user.id !== parseInt(userId));
            setUsers(filteredUsers);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await UserService.getUserByIdAsync(parseInt(sessionStorage.getItem('userId')));
            setUser(response.data);
        } catch (error) {
            push('/error');
        }
    }

    useEffect(() => { }, [users]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleFollowedOrUnfollowed = async () => {
            await fetchUser();
        };
        window.addEventListener('followedOrUnfollowed', handleFollowedOrUnfollowed);
        
        return () => {
            window.removeEventListener('followedOrUnfollowed', handleFollowedOrUnfollowed);
        };
    }, []);

    return (
        <>
            <Sidebar user={user}/>
            <main>
                <div className={styles.container}>
                    <PageTitle title="Search users" />
                    <form onSubmit={handleSubmit} className={styles.searchBar}>
                        <TextField
                            className={styles.searchInput}
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            value={searchTerm}
                            sx={{width: '30vw'}}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            helperText="Press enter to search"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon/>
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <button type="submit" style={{ display: "none" }}></button>
                    </form>
                    <UsersTable users={users} />
                </div>
            </main>
        </>
    );
};
export default Search;
