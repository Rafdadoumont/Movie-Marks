import React, { useState, useEffect, useContext, createContext } from 'react';
import Sidebar from "../components/sidebar/sidebar";
import MarkComponent from '../components/marks/markcomponent/MarkComponent';
import MarkService from "../services/MarkService";
import UserService from "../services/UserService";
import { useRouter } from 'next/router';
import MarkForm from '../components/marks/form/markForm';
import PageTitle from '../components/pagetitle/PageTitle';

const Home: React.FC = () => {
    const { push } = useRouter();
    const [marks, setMarks] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [user, setUser] = useState({ id: null, username: "", password: "", marks: [], followedBy: [], following: [] });

    const fetchMarks = async () => {
        try {
            const response = await MarkService.getMarksForLoggedInUserAsync();
            setMarks(response.data);
        } catch (error) {
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

    const triggerUpdate = () => {
        setUpdateFlag(prev => !prev);
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
            await fetchMarks();
        };
        fetchData();
    }, [updateFlag]);

    return (
        <>
            <Sidebar user={user} />
            <main>
                <PageTitle title="Your feed" />
                <div className='feedContainer'>
                    <div className='markContainer'>
                        {marks.map((mark) => (
                            <MarkComponent key={mark.id} mark={mark} onMarkEdit={triggerUpdate} onMarkDelete={triggerUpdate} />
                        ))}
                    </div>
                    <MarkForm onFormSubmit={triggerUpdate} />
                </div>
            </main>
        </>
    );
}
export default Home;