import React from 'react';
import {useNavigation} from "react-router-dom";

function Accesses() {
    const navigation = useNavigation();

    console.log(navigation);

    return (
        <div>Accesses</div>
    );
}

export default Accesses;