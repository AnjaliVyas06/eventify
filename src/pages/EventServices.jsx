import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";

function EventServices() {
    const { eventId } = useParams();
    const [services, setServices] = useState([]);
    const [status, setStatus] = useState("Loading services...");

    useEffect(() => {
        api.getServices()
            .then(({ services: records }) => {
                setServices(records);
                setStatus(records.length ? "" : "No services are available yet.");
            })
            .catch((error) => setStatus(error.message));
    }, []);

    return (
        <main className="min-h-screen bg-[#09070d] px-6 py-14 text-white">
            <div className="mx-auto max-w-[1100px]">
                <Link to={`/events/${eventId}`} className="text-sm text-[#aaa]">← Back to event</Link>
                <h1 className="mt-8 text-4xl font-bold">Event services</h1>
                <p className="mt-3 text-[#999]">Choose from the services configured by the Eventify team.</p>
                {status && <p className="mt-10 text-[#c084fc]">{status}</p>}
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <article key={service._id} className="rounded-[18px] border border-[#292230] bg-[#111016] p-6">
                            <div className="text-3xl">{service.icon || "✦"}</div>
                            <h2 className="mt-5 text-lg font-bold">{service.name}</h2>
                            <p className="mt-2 text-sm leading-7 text-[#999]">{service.description}</p>
                            {service.priceFrom !== undefined && <p className="mt-4 text-sm text-[#c084fc]">From {service.priceFrom}</p>}
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default EventServices;