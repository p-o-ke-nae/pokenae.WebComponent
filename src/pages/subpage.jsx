import React from 'react';
import { useAppContext } from '../context/AppContext';

const Index = () => {
const { showInfo, showWarning, showConfirm } = useAppContext();

    return (
        <div>
            <button onClick={() => showWarning('This is an warning message',2)}>Show Info</button>
        </div>
    );
};

export default Index;