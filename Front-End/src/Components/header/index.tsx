import styles from "./header.module.scss"

function Header() {
    return (
    <>
        <header className={styles.header}>
            <div>
                <h1><span>Nu</span>Kenzie</h1>
            </div>
        </header>
    </>
    )
}

export default Header;