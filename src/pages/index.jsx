import React from 'react';
import { useAppContext } from '../context/AppContext';

const Index = () => {
const { showInfo, showWarning, showConfirm } = useAppContext();

    return (
        <div>
            <button onClick={() => showInfo('This is an info message')}>Show Info</button>
            <a href={ './subpage'}>sub</a>
        </div>
    );
};

export default Index;