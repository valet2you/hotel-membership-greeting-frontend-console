
import { useEffect, useState } from 'react'
import GuestCard from '../components/GuestCard'
import { fetchAllGuests } from '../services/apiService';
const Dashboard = () => {
    const [selectedUser, setSelectedUser] = useState(0);
    const guestList = [0, 1, 2];
    let template = "GOLD"
    useEffect(() => {
        getAllGuests()
    }, []);

    const getAllGuests = async () => {
        try {
            const response = await fetchAllGuests();
            console.log(response)
        } catch (error) {

        }
    }

    return (
        <div className='dashboard-container'>
            <div className="guest-list-container">
                <div className='dashboard-wrapper'>
                    <div className='title'>Welcome your guests!</div>
                    <div className='sub-title'>Manage your guest welcome message to give them a warm welcome in you hotel.</div>
                </div>
                <div className="list-container">
                    {guestList.map((guest, index) => <GuestCard key={index} index={index} guest={guest} selectedUser={selectedUser} template={template} />)}
                </div>
            </div>

            <div className="guest-app-preview">
                <div className="mobile-view">
                    <iframe
                        src={`https://main.d1yxbpv58iwpc3.amplifyapp.com`}
                        height='554'
                        width='262'
                        title='mobile-view'
                    ></iframe>
                </div>
            </div>

        </div>
    )
}

export default Dashboard