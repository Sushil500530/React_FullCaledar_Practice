import './App.css'
import Modal from 'react-modal';
import Calendar from './calendar/Calendar';
Modal.setAppElement('#root');



function App() {

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-5 underline">
        Hello world!
      </h1>
      <Calendar />
    </>
  )
}

export default App
