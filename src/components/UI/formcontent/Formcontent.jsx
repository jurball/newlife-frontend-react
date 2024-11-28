export default function Formcontent({ title, children, ...props }) {
    return (
        <>
            <h1>{title}</h1>
            <div className="user__block">
                <form {...props}>
                    {children}
                </form>
            </div>
        </>
    )
}