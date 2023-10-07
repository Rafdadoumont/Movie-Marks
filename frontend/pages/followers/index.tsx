import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import UserService from "../../services/UserService";
import UsersTable from "../../components/userstable/UsersTable";
import Sidebar from "../../components/sidebar/sidebar";
import styles from './followers.module.css';
import PageTitle from "../../components/pagetitle/PageTitle";


const Followers: React.FC = () => {
    const { push } = useRouter();
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState({ id: null, username: "", password: "", marks: [], followedBy: [], following: [] });

    const fetchFollowers = async () => {
        try {
            const response = await UserService.getFollowersListAsync();
            setFollowers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUser = async () => {
        try {
            const response = await UserService.getUserByIdAsync(parseInt(sessionStorage.getItem('userId')));
            setUser(response.data);
        } catch (error) {
            push('/error');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchFollowers();
            await fetchUser();
        };
        fetchData();
    }, [followers]);


    return (
        <>
            <Sidebar user={user} />
            <main>
            <PageTitle title="Followers" />
                <div className={styles.container}>
                    <UsersTable users={followers} />
                </div>
            </main>
        </>
    )
}

export default Followers