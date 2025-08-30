import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


//  Make sure to destruture all item but firstly fetch data from backend and pass it in function Eventdetails 
// to have a reference you can check AllEvent.jsx
//
 

const EventDetails = () => {
  return (
    <div className="container mt-3">
      <div className="card shadow-sm" style={{ maxWidth: "800px" }}>
        <div className="row g-0">
          {/* Left side - Event Image */}
          <div className="col-md-4">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.DpcLyyRCeTWoiiMNdCTXxQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Event"
              className="img-fluid h-100 w-100 rounded-start"
              style={{ objectFit: "cover", minHeight: "300px" }}
            />
          </div>
          
          {/* Right side - Event Details */}
          <div className="col-md-8">
            <div className="card-body p-3">
              <h4 className="card-title mb-3">eventName</h4>
              
              <div className="row">
                <div className="col-6">
                  <p className="mb-1"><strong>Date:</strong> eventDate</p>
                  <p className="mb-1"><strong>Time:</strong> eventTime</p>
                  <p className="mb-1"><strong>Location:</strong> eventLocation</p>
                  <p className="mb-2"><strong>Category:</strong> ticketCategory</p>
                </div>
                
                <div className="col-6">
                  <p className="mb-1"><strong>Sales Start:</strong> salesStart</p>
                  <p className="mb-1"><strong>Sales End:</strong> salesEnd</p>
                  <p className="mb-1"><strong>Max/User:</strong> maxTicketsPerUser</p>
                  <p className="mb-2"><strong>Total:</strong> totalTickets</p>
                </div>
              </div>
              
              <p className="mb-2"><strong>Description:</strong> eventDescription</p>
              
              {"Paid" === "Paid" && (
                <div className="mb-2">
                  <p className="mb-1">
                    <strong>Standard:</strong> ₹standardPrice | 
                    <strong> VIP:</strong> ₹vipPrice
                  </p>
                </div>
              )}
              
              {/* Compact Discount Card */}
              {1 && (
                <div className="d-flex align-items-center mb-2 p-2 border rounded bg-light" style={{ maxWidth: "220px" }}>
                  {/* <img
                    src="https://cdn-icons-png.flaticon.com/512/929/929426.png"
                    alt="Discount"
                    className="me-2"
                    style={{ width: "30px", height: "30px" }}
                  /> */}
                  
                </div>
              )}
              
              {/* Buttons */}
              <div className="d-flex gap-2">
                <button className="btn btn-success btn-sm flex-fill">Favourite</button>
                <button className="btn btn-primary btn-sm flex-fill">Buy Ticket</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;