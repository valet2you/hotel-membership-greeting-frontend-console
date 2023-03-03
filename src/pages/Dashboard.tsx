import { useEffect, useState } from 'react';
import GuestCard from '../components/GuestCard';
import { templateContent } from '../interfaces';
import {
    createTemplateContent,
    fetchAllTemplateContent,
    generateHotelID,
} from '../services/apiService';
const Dashboard = () => {
    const [guestList, setGuestList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserID, setSelectedUserID] = useState(null);

    useEffect(() => {
        getAllTemplateContent();
    }, []);

    const getAllTemplateContent = async () => {
        setIsLoading(true);
        setSelectedUserID(null);
        try {
            const response = await fetchAllTemplateContent();
            if (response.status === 200) {
                const result = await response.json();
                if (result.response && result.response.length) {
                    setGuestList(result.response || []);
                }
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    const createTemplate = async () => {
        try {
            const body = {
                id: 10,
                name: 'P1',
                hotel_id: 1,
                template_type: 'PLATINUM',
                content: {
                    welcomeTitle: 'Welcom to W Maldives',
                    guestName: 'new guest user',
                    description: 'This is a test description',
                },
            };
            const response = await createTemplateContent(body);
            console.log(response)
            if(response.status === 201) {
                getAllTemplateContent()
            }
        } catch (error) {}
    };
    const createHotelID = async () => {
        try {
            const response = await generateHotelID();
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
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        guestList.map((guest: templateContent, index) => (
                            <GuestCard
                                id={guest.id}
                                key={index}
                                selectedUserID={selectedUserID}
                                template_type={guest.template_type}
                                guestCardClickHandler={guestCardClickHandler}
                                getAllTemplateContent={getAllTemplateContent}
                                content={guest.content}
                                hotel_id={guest.hotel_id}
                                name={guest.name}
                            />
                        ))
                    )}
                </div>
                <div className='add-new-guest-card'>
                    <button
                        className='btn btn-primary'
                        onClick={createTemplate}
                    >
                        Add new Guest
                    </button>
                </div>
                {/* <div className='add-new-guest-card'>
                    <button className='btn btn-primary' onClick={createHotelID}>
                        create Hotel ID
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
