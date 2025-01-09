import React from 'react'

const TimestampToDate = ({ timestamp, title}) => {
    // Convert the timestamp to milliseconds and create a Date object
    const date = new Date(timestamp * 1000);
    // Format the date
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
  
    return <p>{title}: {formattedDate}</p>;
}

export default TimestampToDate