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
        fetch('http://127.0.0.1:8080/api/v1/seat/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedSeats)
        })
        .then((response) => response.json())
        .then((data) => {
            window.alert(data['message']);
            window.location.reload();
        });
    }

    useEffect(() => {
      fetch('http://127.0.0.1:8080/api/v1/seat/', {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => setSeats(data));

    }, [])
    
    return (
        <>
        <div className='flex justify-center items-center max-w-xl flex-wrap my-12'>
        {seats.map((seat) => (
            <Seat key={seat['id']} id={seat['id']} isReserved={seat['reserved']} isSelected={selectedSeats.includes(seat['id'])} onClick={() => handleSeatSelection(seat['id'])} />
        ))}
        
            <div className="text-xs font-semibold bg-blue-100 w-full border-2 border-slate-400 mt-12 mb-8">SCREEN</div>

        </div>
        
        <Button onClick={() => handleSubmit()}>Proceed</Button>
        </>
    );
}

export default Auditorium;