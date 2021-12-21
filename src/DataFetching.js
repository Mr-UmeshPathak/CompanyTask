import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DataFetching() {
    const [post, setPost] = useState({})
    const [allEvents, setAllEvents] = useState([]);

    const url = `https://www.gov.uk/bank-holidays.json`

    useEffect(() => {
        axios
            .get(url)
            .then(res => {
                setPost(res.data)
                let eventsArray = [];
                Object.keys(res.data).forEach((key, i)=>{

                    let currentEvents = res.data[key].events;
                    let currentDivision = res.data[key].division;
                    currentEvents.forEach((event, i)=>{
                        event['division'] =currentDivision;
                    })
                    eventsArray = eventsArray.concat(currentEvents);
                    setAllEvents(eventsArray)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [url])

    return (
        <div className='dataSection'>
            <p> -- Data is here -- </p>
            <table>
                <tr>
                    <th>Division</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Notes</th>
                </tr>
                {
                    allEvents.map((event, i)=>
                        <tr key={i}>
                            <td>{event.division}</td>
                            <td>{event.title}</td>
                            <td>{event.date}</td>
                            <td>{event.notes}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default DataFetching