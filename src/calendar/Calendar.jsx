import { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';
import './calendar.css'


export default function Calendar() {
    // const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    let [isOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }
    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi()
        console.log(calendarApi);
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        })
    }

    async function handleEventAdd(data) {
        await axios.post('http://localhost:5000/create-rutine', data.event)
    }

    const handleDelete = (data) => {
        console.log(events);
        // events.getEventById(data)
    }
    async function handleDateSet(data) {
        const response = await axios.get('http://localhost:5000/rutines?start=' + moment(data.start).toISOString() + '&end=' + moment(data.end).toISOString())
        console.log(response.data);
        setEvents(response.data)
    }
    return (
        <section className='w-[100%] h-screen mx-auto p-5'>
            <div className='flex items-center justify-center'>
                <button type="button" onClick={openModal} className="px-5 py-2 bg-green-700 text-white hover:text-black rounded">
                    Add Event
                </button>
            </div>
            {/* <button onClick={() => setModalOpen(true)} className='ml-12 px-5 py-2 bg-green-700 rounded text-white hover:text-black'>Add Event</button> */}

            <div className='w-[80%] mx-auto flex items-center justify-between p-5 flex-col'>
                <div className='w-full'>
                    <div className='relative z-0 w-full'>
                        <FullCalendar
                            ref={calendarRef}
                            events={events}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            eventAdd={(event) => handleEventAdd(event)}
                            datesSet={(date) => handleDateSet(date)}
                            height={'70vh'}
                            editable={true}
                            nowIndicator={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}
                            // dateClick={{}}
                            // drop={{}}
                            // eventClick={{}}



                            headerToolbar={{
                                start: "today prev, next",
                                center: 'title',
                                end: "dayGridMonth,timeGridWeek,timeGridDay"
                            }}
                        />
                    </div>
                </div>
            </div>

            <AddEventModal isOpen={isOpen} closeModal={closeModal} onEventAdded={(event) => onEventAdded(event)} />
            {/* <AddEventModal isOpne={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={(event) => onEventAdded(event)} /> */}
        </section>
    )
}

