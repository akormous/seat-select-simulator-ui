
interface SeatProps {
    id: number;
    isReserved: boolean;
    isSelected: boolean;
    onClick: () => void;
}

function Seat({ id, isReserved, isSelected, onClick } : SeatProps) {

    return (
        <>
        <div>
            <div onClick={isReserved ? () => {} : onClick} className={`w-8 h-8 flex items-center justify-center border-2 rounded-sm m-1 text-sm font-semibold cursor-pointer ${isReserved ? 'text-white bg-slate-400 border-0' : `${isSelected ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-900 border-green-600'}`}` }>
                {id}
            </div>
        </div>
        </>
    );
}

export default Seat;