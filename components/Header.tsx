import React from 'react';
import styles from './Header.module.css';


interface Props {
    children: React.ReactChild
}

export const Header = ({ children }: Props) => {
    return (
        <header className={styles.header}>
            {children}
        </header>
    )
}
