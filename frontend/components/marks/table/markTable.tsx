import React, { useState, useEffect } from "react";
import MovieService from "../../../services/MovieService";
import UserService from "../../../services/UserService";
import styles from "./marktable.module.css";

const MarkTable = ({ marks }) => {
    
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr className={styles.tr}>
                    <th>User</th>
                    <th>Movie Title</th>
                    <th>Rating</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {marks.map((mark) => (
                    <tr key={mark.id} className={styles.tr}>
                        <td className={styles.td}>{mark.username}</td>
                        <td className={styles.td}>{mark.movieTitle}</td>
                        <td className={styles.td}>{mark.rating}</td>
                        <td className={styles.td}>{mark.comment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MarkTable;
