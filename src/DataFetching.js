import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DataFetching() {
    const [post, setPost] = useState({});
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

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
                    setAllEvents(eventsArray);
                    setFilteredEvents(eventsArray);
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [url])

    const filterData = () =>{
        let fromDateObject = new Date(fromDate);
        let toDateObject = new Date(toDate);

        let tempArray = allEvents.filter((event)=>{
            let eventDateObject = new Date(event.date);
            return (eventDateObject < toDateObject) && (eventDateObject > fromDateObject);
        })
        setFilteredEvents(tempArray)
    }

    return (
        <div className='dataSection'>
            <p> -- Data is here -- </p>
            <span>From: </span><input type="date" onChange={(e) => setFromDate(e.target.value)} />
            <span style={{marginLeft:'20px'}}>To: </span><input type="date" onChange={(e) => setToDate(e.target.value)} />
            <button onClick={filterData} style={{ marginLeft: '20px' }} >Fliter</button>
            <button onClick={() => setFilteredEvents(allEvents)} style={{ marginLeft: '20px' }} >All Data</button> <br /> <br />
            <table>
                <tr>
                    <th>Division</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Notes</th>
                </tr>
                {
                    filteredEvents.map((event, i)=>
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