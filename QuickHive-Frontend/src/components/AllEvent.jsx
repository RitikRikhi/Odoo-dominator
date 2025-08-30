import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// events Backend sa fetch karna fir chal jayega
// make sure to  fetch evnts from backend
// small card copy paste kiya hai to isma SmallCard.jsx
const EventsList = ({ events }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Events</h2>
      <div className="row">
        {events.length > 0 ? (
      
          events.map((event, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.DpcLyyRCeTWoiiMNdCTXxQHaEK"
                  alt={event.eventName}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.eventName}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {event.eventDate} <br />
                    <strong>Time:</strong> {event.eventTime} <br />
                    <strong>Location:</strong> {event.eventLocation} <br />
                    <strong>Tickets:</strong> {event.ticketCategory}
                  </p>
                  {event.ticketCategory === "Paid" && (
                    <>
                      <p><strong>Standard:</strong> ₹{event.standardPrice}</p>
                      <p><strong>VIP:</strong> ₹{event.vipPrice}</p>
                    </>
                  )}
                  <button className="btn btn-primary w-100">View Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventsList;
