import Auditorium from "@/components/Auditorium";

function HomeScreen() {
    return (
        <>
        <div className="flex flex-col items-center justify-center text-black">
            <h1 className="text-2xl font-semibold">Seat-Select Simulator</h1>
            <p>There is no way you can book the same seat from two users</p>
        <Auditorium />
        </div>
        </>
    );
}

export default HomeScreen;