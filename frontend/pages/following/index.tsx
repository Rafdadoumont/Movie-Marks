import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import UserService from "../../services/UserService";
import UsersTable from "../../components/userstable/UsersTable";
import Sidebar from "../../components/sidebar/sidebar";
import styles from './following.module.css';
import PageTitle from "../../components/pagetitle/PageTitle";


const Following: React.FC = () => {
    const { push } = useRouter();
    const [user, setUser] = useState({ id: null, username: "", password: "", marks: [], followedBy: [], following: [] });
    const [following, setFollowing] = useState([]);

    const fetchFollowing = async () => {
        try {
            const response = await UserService.getFollowingListAsync();
            setFollowing(response.data);
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
            await fetchFollowing();
            await fetchUser();
        };
        fetchData();
    }, [following]);


    return (
        <>
            <Sidebar user={user} />
            <main>
                <PageTitle title="Following" />
                <div className={styles.container}>
                <UsersTable users={following} />
                </div>
            </main>
        </>
    )
}

export default Following