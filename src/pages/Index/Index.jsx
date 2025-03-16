import Styles from './Index.module.css';
import React from 'react';

export default function Index() {
    return (
        <div className={`${Styles['home']}`}>
            <h1>Добро пожаловать!</h1>
            {process.env.REACT_APP_MESSAGE ? <DeveloperMessage /> : <Home />}
        </div>
    );
}

function DeveloperMessage() {
    return (
        <>
            <div className={`${Styles['box']}`}>
                <h2>От автора</h2>
                <p>
                    Привет! Я рад что ты проявил интерес к этому проекту.
                </p>
                <p>
                    Это сообщение в режиме разработки, но если собрать проект с помощью
                    <code className={`${Styles['pre']}`}>npm run build</code> то сообщение исчезнет.
                </p>
            </div>
            <About/>
        </>
    );
}

function Home() {
    return (
        <>
            <About/>
        </>
    )
}

function About() {
    return (
        <>
            <p>
                <span>NewLife</span> это облачное хранилище с возможностью разграничения прав доступа к файлам
            </p>
            <div className={`${Styles['box']}`}>
                <h2>Функции</h2>
                <div className={`${Styles['box']}`}>
                    <h3>Для авторизованных пользователей</h3>
                    <ul className={`${Styles['list']}`}>
                        <li>возможность сброса авторизации</li>
                        <li>работа с файлами</li>
                        <li>редактирование</li>
                        <li>удаление</li>
                        <li>разграничение прав доступа к файлам</li>
                    </ul>
                </div>
                <div className={`${Styles['box']}`}>

                    <h3>Для неавторизованных пользователей</h3>
                    <ul className={`${Styles['list']}`}>
                        <li>авторизация</li>
                        <li>регистрация</li>
                    </ul>
                </div>
            </div>
        </>
    );
}