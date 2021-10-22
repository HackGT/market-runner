import styles from './Button.module.css'

type ButtonProps = {
    children: any,
    onClick?: any
}

const Button = ({ children, onClick, ...props }: ButtonProps) => {
    return (
        <button onClick={onClick} className={styles.button} {...props}>{children}</button>
    )
}

export default Button;
