import { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';
import './calendar.css'



export default function Calendar() {
    // const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    let [isOpen, setIsOpen] = useState(true);

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }
    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        })
        console.log({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    }

    async function handleEventAdd(data) {
        await axios.post('http://localhost:5000/create-rutine', data.event)
    }

    async function handleDateSet(data) {
        const response = await axios.get('http://localhost:5000/rutines?start=' + moment(data.start).toISOString() + '&end=' + moment(data.end).toISOString())
        console.log(response.data);
        setEvents(response.data)
    }
    return (
        <section className='w-[100%] h-screen mx-auto'>
            <div className='flex items-center justify-center'>
                <button type="button" onClick={openModal} className="px-5 py-2 bg-green-700 text-white hover:text-black rounded">
                    Add Event
                </button>
            </div>
            {/* <button onClick={() => setModalOpen(true)} className='ml-12 px-5 py-2 bg-green-700 rounded text-white hover:text-black'>Add Event</button> */}

            <div className='relative z-0 '>
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd={(event) => handleEventAdd(event)}
                    datesSet={(date) => handleDateSet(date)}
                />
            </div>
            <AddEventModal isOpen={isOpen} closeModal={closeModal} onEventAdded={(event) => onEventAdded(event)} />
            {/* <AddEventModal isOpne={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={(event) => onEventAdded(event)} /> */}
        </section>
    )
}

