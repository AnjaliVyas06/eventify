import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

const emptyForm = { name: "", slug: "", description: "", icon: "", category: "other", priceFrom: "", address: "", capacity: "", customizationPrice: "" };

function AdminCatalog() {
    const [type, setType] = useState("events");
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [status, setStatus] = useState("Loading catalog...");

    const loadItems = () => api.getAdminCatalog(type).then(({ items: records }) => {
        setItems(records);
        setStatus(records.length ? "" : "No items in this catalog.");
    });

    useEffect(() => {
        api.getAdminCatalog(type)
            .then(({ items: records }) => {
                setItems(records);
                setStatus(records.length ? "" : "No items in this catalog.");
            })
            .catch((error) => setStatus(error.message));
    }, [type]);

    const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

    const createItem = async (event) => {
        event.preventDefault();
        setStatus("");
        try {
            const payload = { name: form.name, slug: form.slug, description: form.description, icon: form.icon };
            if (type === "events") Object.assign(payload, { customizationPrice: Number(form.customizationPrice) || 0 });
            if (type === "services") Object.assign(payload, { category: form.category, priceFrom: Number(form.priceFrom) || 0 });
            if (type === "venues") Object.assign(payload, { address: form.address, capacity: Number(form.capacity), priceFrom: Number(form.priceFrom) || 0 });
            await api.createCatalogItem(type, payload);
            setForm(emptyForm);
            await loadItems();
        } catch (error) {
            setStatus(error.message);
        }
    };

    const deactivate = async (id) => {
        try {
            await api.deactivateCatalogItem(type, id);
            await loadItems();
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#09070d] px-6 py-12 text-white">
            <div className="mx-auto max-w-[1100px]">
                <Link to="/admin-profile" className="text-sm text-[#aaa]">← Back to admin profile</Link>
                <p className="mt-8 text-xs font-semibold tracking-[2px] text-[#a855f7]">EVENTIFY MANAGEMENT</p>
                <h1 className="mt-3 text-4xl font-bold">Manage catalog</h1>

                <div className="mt-8 flex flex-wrap gap-2">
                    {["events", "venues", "services"].map((item) => <button key={item} type="button" onClick={() => { setType(item); setForm(emptyForm); }} className={`rounded-[10px] px-4 py-3 text-sm font-semibold capitalize ${type === item ? "bg-[#7c3aed] text-white" : "border border-[#292230] text-[#aaa]"}`}>{item}</button>)}
                </div>

                <form onSubmit={createItem} className="mt-8 rounded-[18px] border border-[#292230] bg-[#111016] p-6">
                    <h2 className="text-xl font-bold">Add {type.slice(0, -1)}</h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <input name="name" value={form.name} onChange={updateField} required placeholder="Name" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                        <input name="slug" value={form.slug} onChange={updateField} required placeholder="Slug, e.g. wedding" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                        <textarea name="description" value={form.description} onChange={updateField} required placeholder="Description" className="min-h-24 rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed] md:col-span-2" />
                        <input name="icon" value={form.icon} onChange={updateField} placeholder="Icon" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />
                        {type === "events" && <input name="customizationPrice" type="number" min="0" value={form.customizationPrice} onChange={updateField} placeholder="Customization price" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" />}
                        {type === "services" && <><select name="category" value={form.category} onChange={updateField} className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]"><option value="other">Other</option><option value="food">Food</option><option value="photography">Photography</option><option value="decoration">Decoration</option><option value="planning">Planning</option></select><input name="priceFrom" type="number" min="0" value={form.priceFrom} onChange={updateField} placeholder="Starting price" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" /></>}
                        {type === "venues" && <><input name="address" value={form.address} onChange={updateField} required placeholder="Address" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" /><input name="capacity" type="number" min="1" value={form.capacity} onChange={updateField} required placeholder="Capacity" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" /><input name="priceFrom" type="number" min="0" value={form.priceFrom} onChange={updateField} placeholder="Starting price" className="rounded-[10px] border border-[#342c3c] bg-[#0d0b12] px-4 py-3 text-white outline-none focus:border-[#7c3aed]" /></>}
                    </div>
                    <button type="submit" className="mt-5 rounded-[10px] bg-[#7c3aed] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8b5cf6]">Add item</button>
                </form>

                {status && <p className="mt-8 text-[#c084fc]">{status}</p>}
                <div className="mt-8 space-y-4">
                    {items.map((item) => <article key={item._id} className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#292230] bg-[#111016] p-5 sm:flex-row sm:items-center"><div><h2 className="font-bold">{item.name}</h2><p className="mt-1 text-sm text-[#999]">{item.description}</p><p className="mt-1 text-xs text-[#c084fc]">{item.isActive ? "Active" : "Inactive"}{type === "events" ? ` · ${item.isPublished ? "Published" : "Unpublished"} · customization ${item.customizationPrice || 0}` : ""}</p></div><div className="flex flex-wrap gap-2">{type === "events" && <Link to={`/admin/availability?event=${item._id}`} className="rounded-[10px] border border-[#292230] px-4 py-2 text-sm text-[#aaa] no-underline">Schedule dates</Link>}{type === "events" && item.isActive && <button type="button" onClick={async () => { try { await (item.isPublished ? api.unpublishEvent(item._id) : api.publishEvent(item._id)); await loadItems(); } catch (error) { setStatus(error.message); } }} className="rounded-[10px] border border-[#7c3aed] px-4 py-2 text-sm text-[#c084fc]">{item.isPublished ? "Unpublish" : "Publish"}</button>}{item.isActive && <button type="button" onClick={() => deactivate(item._id)} className="rounded-[10px] border border-red-500/50 px-4 py-2 text-sm text-red-300">Deactivate</button>}</div></article>)}
                </div>
            </div>
        </main>
    );
}

export default AdminCatalog;