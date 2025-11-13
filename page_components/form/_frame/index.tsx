type Props = {
    children: React.ReactNode,
    atributes?: React.FormHTMLAttributes<HTMLFormElement>
}
export  function FormFrame({ children, atributes }: Props) {
    return (
        <form {...atributes}>
            {children}
        </form>
    )
}