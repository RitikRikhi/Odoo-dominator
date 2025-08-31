
import React, { useState } from 'react'
import './AddNewEvent.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNewEvent = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        eventDescription: '',
        ticketCategory: '',   // Free or Paid
        standardPrice: '',
        vipPrice: '',
        discountCode: '',
        salesStart: '',
        salesEnd: '',
        maxTicketsPerUser: '',
        totalTickets: ''
    });
    const [isLoading,setIsLoading]=useState(false);
    const [successMessage,setSuccessMessage]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const navigate=useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('')

        try{
            const token = localStorage.getItem('userToken')
            if(!token){
                setErrorMessage('Please login to create events');
                setIsLoading(false);
                return;
            }

            const totalTickets = parseInt(formData.totalTickets) || 0;
            const tickets = formData.ticketCategory === 'Paid' ? [
                {
                    type: 'Standard',
                    price: parseFloat(formData.standardPrice) || 0,
                    quantity: Math.floor(totalTickets / 2),
                    saleStart: formData.salesStart,
                    saleEnd: formData.salesEnd
                },
                {
                    type: 'VIP',
                    price: parseFloat(formData.vipPrice) || 0,
                    quantity: Math.ceil(totalTickets / 2),
                    saleStart: formData.salesStart,
                    saleEnd: formData.salesEnd
                }
            ] : [
                {
                    type: 'Free',
                    price: 0,
                    quantity: totalTickets,
                    saleStart: formData.salesStart,
                    saleEnd: formData.salesEnd
                }
            ];

            const eventData = {
                title: formData.eventName,
                eventDate: formData.eventDate,
                eventTime: formData.eventTime,
                eventLocation: formData.eventLocation,
                description: formData.eventDescription,
                ticketType: formData.ticketCategory,
                paidTicketCategory: formData.ticketCategory === 'Paid' ? 'Standard' : undefined,
                category: 'General', // Add category field if needed
                tickets: tickets
            };

            console.log("Form submitted: ",eventData);
            const res=await axios.post('http://localhost:5000/api/events/create',eventData,{
                headers:{
                    Authorization:`Bearer ${token}`,
                     'Content-Type': 'application/json'
                }
            })
            console.log('Event created  Successfully',res.data)
            setSuccessMessage('Event created successfully!');
            navigate('/events')
            // Optionally navigate to events page
            // navigate('/events');
        }
        catch(error){
              console.error('Error creating event:', error);
            
            if (error.response) {
                // Server responded with error status
                setErrorMessage(error.response.data.message || 'Failed to create event. Please try again.');
            } else if (error.request) {
                // Request was made but no response received
                setErrorMessage('Network error. Please check your connection and try again.');
            } else {
                // Something else happened
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        
            
        }
 
        // TODO: Add API call to create event
        // axios.post('/api/events/create', formData, {
        //   headers: { Authorization: `Bearer ${token}` }
        // })
    };

    return (
        <div className="container mt-4 formContainer">
            <h1 className="mb-4 text-center">Add New Event</h1>
                 {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {successMessage}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSuccessMessage('')}
                    ></button>
                </div>
            )}
            
            {/* Error Message */}
            {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {errorMessage}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setErrorMessage('')}
                    ></button>
                </div>
            )}

            <form 
                onSubmit={handleSubmit}
                className="p-4 border rounded shadow-sm bg-light" 
                style={{ maxWidth: '700px', margin: '0 auto' }}
            >
           
                <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">Event Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        placeholder="Enter event name" 
                        required
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="eventDate" className="form-label">Event Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="eventDate"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="eventTime" className="form-label">Event Time</label>
                        <input 
                            type="time" 
                            className="form-control" 
                            id="eventTime"
                            name="eventTime"
                            value={formData.eventTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="eventLocation" className="form-label">Event Location</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="eventLocation"
                        name="eventLocation"
                        value={formData.eventLocation}
                        onChange={handleChange}
                        placeholder="Enter event location" 
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="eventDescription" className="form-label">Event Description</label>
                    <textarea 
                        className="form-control" 
                        id="eventDescription"
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                        rows="3" 
                        placeholder="Enter event description"
                    ></textarea>
                </div>

                {/* Ticket Details */}
                <div className="mb-3">
                    <label htmlFor="ticketCategory" className="form-label">Ticket Category</label>
                    <select
                        className="form-select"
                        id="ticketCategory"
                        name="ticketCategory"
                        value={formData.ticketCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Ticket Type --</option>
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>

                {formData.ticketCategory === 'Paid' && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="standardPrice" className="form-label">Standard Ticket Price</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="standardPrice"
                                name="standardPrice"
                                value={formData.standardPrice}
                                onChange={handleChange}
                                placeholder="Enter standard ticket price" 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="vipPrice" className="form-label">VIP Ticket Price</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="vipPrice"
                                name="vipPrice"
                                value={formData.vipPrice}
                                onChange={handleChange}
                                placeholder="Enter VIP ticket price" 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="discountCode" className="form-label">Discount Code</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="discountCode"
                                name="discountCode"
                                value={formData.discountCode}
                                onChange={handleChange}
                                placeholder="Enter discount code (if any)" 
                            />
                        </div>
                    </>
                )}

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="salesStart" className="form-label">Sales Start Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="salesStart"
                            name="salesStart"
                            value={formData.salesStart}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="salesEnd" className="form-label">Sales End Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="salesEnd"
                            name="salesEnd"
                            value={formData.salesEnd}
                            onChange={handleChange}
                            min={formData.salesStart}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="maxTicketsPerUser" className="form-label">Max Tickets per User</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="maxTicketsPerUser"
                            name="maxTicketsPerUser"
                            value={formData.maxTicketsPerUser}
                            onChange={handleChange}
                            placeholder="e.g. 5"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="totalTickets" className="form-label">Total Tickets Available</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="totalTickets"
                            name="totalTickets"
                            value={formData.totalTickets}
                            onChange={handleChange}
                            placeholder="e.g. 100"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
                    {isLoading ? 'Creating Event...' : 'Add Event'}
                </button>
            </form>
        </div>
    );
};

export default AddNewEvent;
