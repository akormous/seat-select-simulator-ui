import Seat from "./Seat";

function Auditorium() {
    const ids = [...Array(50).keys()]
    return (
        <>
        <div className='flex justify-center items-center max-w-lg flex-wrap'>
        {ids.map((id) => (
            <Seat id={id} isReserved={false} />
        ))}
        </div>
        </>
    );
}

export default Auditorium;