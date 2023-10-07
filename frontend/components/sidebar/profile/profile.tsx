import styles from './profile.module.css';
import CircleIcon from '@mui/icons-material/Circle';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import AvatarColor from "../../../theme/AvatarColor";

function Profile({ user }) {
    if (!user) {
        return (
            <div className={styles.errorContainer}>
                <p>Error: User not found.</p>
            </div>
        );
    }

    return (
        <div className={styles.userContainer}>
            <Avatar sx={{ backgroundColor: AvatarColor.convert(user.username) }}>{user.username[0]}</Avatar>
            <p className={styles.username}>{user.username}</p>
            <div className={styles.followContainer}>
                <Link href="/following" className={styles.link}>{user.following.length} Following</Link>
                <CircleIcon className={styles.circle} />
                <Link href="/followers" className={styles.link}>{user.followedBy.length} Followers</Link>
            </div>
        </div>
    )
}

export default Profile;
