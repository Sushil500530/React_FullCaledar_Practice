/* eslint-disable react/prop-types */
import { useState } from 'react';
// import Modal from 'react-modal';
import Datetime from 'react-datetime';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'


export default function AddEventModal({ isOpen, closeModal, onEventAdded }) {
    // export default function AddEventModal({ isOpne, onClose, onEventAdded }) {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());


    const onSubmit = (e) => {
        e.preventDefault();
        onEventAdded({
            title,
            start,
            end
        })
        closeModal();

    }
    return (
        // <Modal isOpen={isOpne} onRequestClose={onClose}>
        //     <form onSubmit={onSubmit}>
        //         <input type='text' placeholder='title....' onChange={() => setTitle(event.target.value)} />
        //         <div>
        //             <label>Start Date</label>
        //             <Datetime value={start} onChange={date => setStart(date)} />
        //         </div>
        //         <div>
        //             <label>End Date</label>
        //             <Datetime value={end} onChange={date => setEnd(date)} />
        //         </div>
        //         <button>Add Event</button>
        //     </form>
        // </Modal>
        <>

            <>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">

                                        <form onSubmit={onSubmit} className='space-y-5'>
                                            <input type='text' placeholder='title....' onChange={() => setTitle(event.target.value)} />
                                            <div>
                                                <label>Start Date</label>
                                                <Datetime value={start} onChange={date => setStart(date)} />
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <Datetime value={end} onChange={date => setEnd(date)} />
                                            </div>
                                            <button className='px-5 py-2 bg-green-700 text-white hover:text-black w-full rounded'>Add Event</button>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        </>
    )
}