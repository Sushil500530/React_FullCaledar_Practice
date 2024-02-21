/* eslint-disable react/prop-types */
import Datetime from 'react-datetime';
import { useState } from 'react';
import Modal from 'react-modal';
// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment } from 'react'
// const RutineModal = ({ isOpen, setIsOpen, onRutineAdded }) => {
    const RutineModal = ({ isOpen, onClose, onEventAdded }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const handleSubmit = (e) => {
        e.preventDefault();
      
        onEventAdded({
            title,
            start,
             end
        })
        onClose();
    }
    // function closeModal() {
    //     setIsOpen(false)
    // }


    return (
        <div className='w-1/2 mx-auto'>
            <Modal isOpen={isOpen} onRequestClose={onClose} >
             <form onSubmit={handleSubmit}>
                 <input type='text' placeholder='title....' onChange={() => setTitle(event.target.value)} />
                 <div>
                     <label htmlFor="start">Start Date</label>
                     <Datetime value={start} onChange={date => setStart(date)} />
                 </div>
                 <div>
                     <label htmlFor="end">End Date</label>
                     <Datetime value={end} onChange={date => setEnd(date)} />
                 </div>
                 <button>Add Rutine</button>
             </form>
         </Modal> 

            {/* <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <form onSubmit={handleSubmit}>
                                            <input type='text' placeholder='title....' onChange={() => setTitle(event.target.value)} />
                                            <div>
                                                <label htmlFor="start">Start Date</label>
                                                <Datetime value={start} onChange={date => setStart(date)} />
                                            </div>
                                            <div>
                                                <label htmlFor="end">End Date</label>
                                                <Datetime value={end} onChange={date => setEnd(date)} />
                                            </div>
                                            <button>Add Rutine</button>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </> */}
        </div>
    );
};

export default RutineModal;
