import Styles from './ErrorBoundary.module.css';
import {useRouteError} from "react-router-dom";

export default function ErrorBoundary() {
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
            </div>
        </main>
    );
}