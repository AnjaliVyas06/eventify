import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { api } from "../lib/api";

function FakePayment() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [status, setStatus] = useState("Loading payment details...");
    const [isPaid, setIsPaid] = useState(false);
    const [isPaying, setIsPaying] = useState(false);

    useEffect(() => {
        api.getBooking(bookingId)
            .then(({ booking: record }) => {
                setBooking(record);
                setIsPaid(record.paymentStatus === "paid");
                setStatus("");
            })
            .catch((error) => setStatus(error.message));
    }, [bookingId]);

    const completePayment = async () => {
        setIsPaying(true);
        setStatus("");
        try {
            const { booking: paidBooking } = await api.simulatePayment(bookingId);
            setBooking(paidBooking);
            setIsPaid(true);
        } catch (error) {
            setStatus(error.message);
        } finally {
            setIsPaying(false);
        }
    };

    if (status && !booking) {
        return <main className="flex min-h-screen items-center justify-center bg-[#09070d] px-6 text-[#c084fc]">{status}</main>;
    }

    return (
        <main className="min-h-screen bg-[#09070d] px-6 py-14 text-white">
            <div className="mx-auto max-w-[560px]">
                <Link to="/my-bookings" className="text-sm text-[#aaa]">← Back to bookings</Link>
                <div className="mt-8 rounded-[22px] border border-[#292230] bg-[#111016] p-7 text-center shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
                    {!isPaid ? <>
                        <p className="text-xs font-semibold tracking-[2px] text-[#a855f7]">EVENTIFY DEMO CHECKOUT</p>
                        <h1 className="mt-3 text-3xl font-bold">Complete your payment</h1>
                        <p className="mt-3 text-sm text-[#999]">This is a fake payment screen for demonstration only. No real money will be charged.</p>
                        <div className="mx-auto mt-8 flex h-48 w-48 items-center justify-center border-8 border-white bg-white p-2" aria-label="Demo payment QR code">
                            <QRCodeSVG value={`EVENTIFY-DEMO-PAYMENT|BOOKING:${booking?._id}|AMOUNT:${booking?.totalPrice}`} size={176} bgColor="#ffffff" fgColor="#111111" level="H" includeMargin />
                        </div>
                        <p className="mt-5 text-sm text-[#aaa]">Scan this demo QR or use the button below.</p>
                        <p className="mt-5 text-2xl font-bold text-[#c084fc]">{booking?.totalPrice}</p>
                        {status && <p className="mt-4 text-sm text-red-300">{status}</p>}
                        <button type="button" onClick={completePayment} disabled={isPaying} className="mt-6 w-full rounded-[10px] bg-[#7c3aed] px-5 py-3 font-semibold text-white transition hover:bg-[#8b5cf6] disabled:opacity-50">{isPaying ? "Processing..." : "Simulate successful payment"}</button>
                    </> : <>
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-5xl text-white">✓</div>
                        <h1 className="mt-6 text-3xl font-bold">Booking payment successful</h1>
                        <p className="mt-3 text-[#999]">Your demo payment was recorded successfully.</p>
                        <p className="mt-5 text-sm text-[#c084fc]">Reference: {booking?.paymentReference}</p>
                        <p className="mt-2 text-sm text-[#aaa]">{booking?.requiresDateApproval ? "Your custom date is now waiting for admin approval." : "Your event booking is confirmed."}</p>
                        <button type="button" onClick={() => navigate("/my-bookings")} className="mt-7 w-full rounded-[10px] bg-[#7c3aed] px-5 py-3 font-semibold text-white hover:bg-[#8b5cf6]">View my bookings</button>
                    </>}
                </div>
            </div>
        </main>
    );
}

export default FakePayment;