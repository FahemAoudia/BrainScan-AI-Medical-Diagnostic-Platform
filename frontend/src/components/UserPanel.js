import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPanel = ({ user }) => {
    const navigate = useNavigate(); 

    useEffect(() => {
        if (user.role === 'patient') {
            navigate('/patient-panel');
        } else if (user.role === 'doctor') {
            navigate('/doctor-panel');
        } else if (user.role === 'admin') {
            navigate('/super-admin-panel');
        }
    }, [user, navigate]);

    return <div>Loading...</div>;
};

export default UserPanel;
