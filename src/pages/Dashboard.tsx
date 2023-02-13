import { useEffect, useState } from 'react';
import GuestCard from '../components/GuestCard';
import { templateContent } from '../interfaces';
import {
    createTemplateContent,
    fetchAllGuests,
    fetchAllTemplateContent,
} from '../services/apiService';
const Dashboard = () => {
    const [guestList, setGuestList] = useState([]);
    const [selectedUserID, setSelectedUserID] = useState(null);

    useEffect(() => {
        getAllTemplateContent();
    }, []);

    const getAllTemplateContent = async () => {
        try {
            const response = await fetchAllTemplateContent();
            if (response.status === 200) {
                const result = await response.json();
                if (result.response && result.response.length) {
                    setGuestList(result.response || []);
                }
            }
        } catch (error) {}
    };
    const createTemplate = async () => {
        try {
            const body = {
                id:10,
                template_type: 'TITANIUM',
                content: {
                    welcomeTitle: 'Welcom to W Maldives',
                    guestName: 'test user',
                    description: 'This is a test description',
                },
            };
            const response = await createTemplateContent(body);
        } catch (error) {}
    };
    const guestCardClickHandler = (id: any) => {
        if (id !== selectedUserID) {
            setSelectedUserID(id);
        } else {
            setSelectedUserID(null);
        }
    };
    return (
        <div className='dashboard-container'>
            <div className='guest-list-container'>
                <div className='dashboard-wrapper'>
                    <div className='title'>Welcome your guests!</div>
                    <div className='sub-title'>
                        Manage your guest welcome message to give them a warm
                        welcome in you hotel.
                    </div>
                </div>
                <div className='list-container'>
                    {guestList.map((guest: templateContent, index) => (
                        <GuestCard
                            id={guest.id}
                            key={index}
                            selectedUserID={selectedUserID}
                            template_type={guest.template_type}
                            guestCardClickHandler={guestCardClickHandler}
                            getAllTemplateContent={getAllTemplateContent}
                            content={guest.content}
                        />
                    ))}
                </div>
                {/* <div className='add-new-guest-card'>
                    <button
                        className='btn btn-primary'
                        onClick={createTemplate}
                    >
                        Add new Guest
                    </button>
                </div> */}
            </div>

            <div className='guest-app-preview'>
                <div className='mobile-view'>
                    <iframe
                        src={`https://main.d1yxbpv58iwpc3.amplifyapp.com`}
                        height='554'
                        width='262'
                        title='mobile-view'
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
