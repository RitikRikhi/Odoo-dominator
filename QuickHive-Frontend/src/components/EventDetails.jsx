//

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const EventDetails = () => {


  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
      <img
            //  src={state.previewImage}
            src = "https://tse2.mm.bing.net/th/id/OIP.DpcLyyRCeTWoiiMNdCTXxQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            // alt={state.eventName}
            className="img-fluid mb-3 rounded"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        <h2 className="text-center mb-3">eventName</h2>
        <p><strong>Date:</strong> eventDate</p>
        <p><strong>Time:</strong> eventTime</p>
        <p><strong>Location:</strong> eventLocation</p>
        <p><strong>Description:</strong> eventDescription</p>
        <p><strong>Ticket Category:</strong> ticketCategory</p>

        {"Paid" === "Paid" && (
          <>
            <p><strong>Standard Price:</strong> ₹standardPrice</p>
            <p><strong>VIP Price:</strong> ₹vipPrice</p>
            {1 && <p><strong>Discount Code:</strong>discountCode</p>}
          </>
          //
          //
          //
        )}

        <p><strong>Sales Start:</strong> salesStart</p>
        <p><strong>Sales End:</strong> salesEnd</p>
        <p><strong>Max Tickets/User:</strong> maxTicketsPerUser</p>
        <p><strong>Available Tickets:</strong> totalTickets</p>

        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Add to favourite
        </button>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
//To Be noted 
//discountCode
