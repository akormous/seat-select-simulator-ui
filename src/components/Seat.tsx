import {useState} from 'react';

interface SeatProps {
    id: number;
    isReserved: boolean;
}

function Seat({ id, isReserved } : SeatProps) {
    const [reserved, setReserved] = useState(isReserved);
    return (
        <>
        <div>
            <svg onClick={() => setReserved(!isReserved)} className={`w-10 h-10 mx-4 text-gray-800 dark:text-white ${reserved ? 'fill-red-700' : 'fill-gray-200'}` } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14">
                <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16.5 7A2.5 2.5 0 0 1 19 4.5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 1 1 0 5V12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.5A2.5 2.5 0 0 1 16.5 7Z"/>
            </svg>
            <h1>{id}</h1>
        </div>
        </>
    );
}

export default Seat;