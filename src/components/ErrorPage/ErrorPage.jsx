import Styles from './ErrorPage.module.css';
import {Link, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <main>
            <div className={`${Styles.errorPage}`}>
                <h1 className={`${Styles.title}`}>Oops!</h1>
                <p className={`${Styles.text}`}>Sorry, an unexpected error has occurred.</p>
                <p className={`${Styles.subtext}`}>
                    <i>{error.statusText || error.message} {error.status}</i>
                </p>
                <Link className={`${Styles.link}`} to="/">Перейти на главную</Link>
            </div>
        </main>
    );
}