import React from 'react';

import './EventItem.css'

// const deleteEventHandler = eventId => {
 
//   const requestBody = {
//     query: `
//         mutation deleteEvent($id: ID!) {
//           deleteEvent(eventId: $id) {
//           _id
//            title
//           }
//         }
//       `,
//     variables: {
//       id: eventId
//     }
//   };

//   fetch('http://localhost:5000/graphql', {
//     method: 'POST',
//     body: JSON.stringify(requestBody),
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + this.context.token
//     }
//   })
//     .then(res => {
//       if (res.status !== 200 && res.status !== 201) {
//         throw new Error('Failed!');
//       }
//       return res.json();
//     })
//     .then(resData => {
//       this.setState(prevState => {
//         const updatedEvents = prevState.events.filter(event => {
//           return event._id !== eventId;
//         });
//         return { bookings: updatedEvents};
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

const eventItem = props => (
    <li key={props.eventId} className="event__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>${props.price} - {new Date(props.date).toLocaleDateString()} - {props.place}</h2>
      </div>
      <div>
      {props.userId === props.creatorId ? (
       <div>
        <p>You're the owner of this event.</p>
        <button className="btn">Edit</button>
        <button className="btn" >Delete</button>
      </div>) : (
        <button className="btn" onClick={props.onDetail.bind(this, props.eventId)}>
        View Details
        </button>
      )}
      </div>
  </li>
);

export default eventItem;

