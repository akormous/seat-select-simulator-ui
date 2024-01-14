import { useState, useEffect } from "react";
import Seat from "./Seat";
import { Button } from "./ui/button";

function Auditorium() {

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const handleSeatSelection = (id: number) => {
        
        if(selectedSeats.includes(id)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat != id))
        }
        else if(selectedSeats.length >= 5) {
            window.alert("Cannot select more than 5 seats per user");
            return;
        }
        else {
            setSelectedSeats([...selectedSeats, id]);
        }
    }

    const handleSubmit = () => {
        console.log(selectedSeats);
        fetch(import.meta.env.VITE_AWS_LAMBDA_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'spring.cloud.function.definition': 'bookSeats',
            },
            body: JSON.stringify({"ids": selectedSeats}),
            cache: 'no-cache'
        })
        .then((response) => response.json())
        .then((data) => {
            const messageObj = JSON.parse(data.body);
            window.alert(messageObj["message"]);
            window.location.reload();
        });
    }

    const handleResetSeats = () => {
        fetch(import.meta.env.VITE_AWS_LAMBDA_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'spring.cloud.function.definition': 'reset',
            },
            cache: 'no-cache'
        })
        .then((response) => response.json())
        .then((data) => {
            const messageObj = JSON.parse(data.body);
            window.alert(messageObj["message"]);
            window.location.reload();
        });
    }

    useEffect(() => {
      fetch(import.meta.env.VITE_AWS_LAMBDA_URL, {
        method: 'POST',
        headers: {
            'spring.cloud.function.definition': 'getAllSeats',
        },
        cache: 'no-cache'
      })
      .then((response) => response.json())
      .then((data) => {console.log(data); setSeats(data); });

    }, [])
    
    return (
        <>
        <div className='flex justify-center items-center max-w-xl flex-wrap my-12'>
        {seats.map((seat) => (
            <Seat key={seat['id']} id={seat['id']} isReserved={seat['reserved']} isSelected={selectedSeats.includes(seat['id'])} onClick={() => handleSeatSelection(seat['id'])} />
        ))}
            <div className="text-xs font-semibold bg-blue-100 w-full border-2 border-slate-400 mt-12 mb-8">SCREEN</div>
            <Button onClick={() => handleSubmit()} className="mx-4">Proceed</Button><br />
            <Button onClick={() => handleResetSeats()} className="mx-4 bg-red-700">Reset Seats</Button>
        </div>
        
        
        </>
    );
}

export default Auditorium;