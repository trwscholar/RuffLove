import React, { useEffect, useState } from "react";
import supabase from "../supabase-client";

interface Event {
  id: string;
  created_at: string;
  title: string;
  location: string;
  time: string;
  price: number;
  description: string;
  image_url: string;
}

const EventPanel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Public URL
  const [imagePath, setImagePath] = useState(""); // Storage path
  const [oldImagePath, setOldImagePath] = useState(""); // Old path (for editing)

  // Fetch events
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("Events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching events:", error.message);
    } else {
      setEvents(data || []);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Upload image to Supabase Storage
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from("event-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("Error uploading image: " + uploadError.message);
      return;
    }

    // Delete old image if editing
    if (editingId && oldImagePath) {
      await supabase.storage.from("event-images").remove([oldImagePath]);
    }

    // Get public URL
    const { data } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setImagePath(fileName);
    if (editingId) setOldImagePath(fileName); // track updated image when editing
    alert("Image uploaded successfully!");
  };

  // Delete image from storage
  const deleteImage = async () => {
    const pathToDelete = editingId && oldImagePath ? oldImagePath : imagePath;
    if (!pathToDelete) return;

    const { error } = await supabase.storage
      .from("event-images")
      .remove([pathToDelete]);

    if (error) {
      alert("Error deleting image: " + error.message);
    } else {
      setImageUrl("");
      setImagePath("");
      if (editingId) setOldImagePath("");
      alert("Image deleted successfully!");
    }
  };

  // Add new event
  const addEvent = async () => {
    if (!title || !time || !location || price === "" || !description) {
      alert("All fields are required");
      return;
    }

    // Format timestamp (datetime-local often returns without seconds)
    let formattedTime = time;
    if (time.length === 16) formattedTime = `${time}:00`;

    const newEvent = {
      title,
      time: formattedTime,
      location,
      price: Number(price),
      description,
      image_url: imageUrl,
    };

    const { error } = await supabase.from("Events").insert([newEvent]);

    if (error) {
      alert("Error adding event: " + error.message);
    } else {
      resetForm();
      fetchEvents();
    }
  };

  // Start editing
  const startEdit = (event: Event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setTime(event.time.slice(0, 16)); // datetime-local expects yyyy-MM-ddTHH:mm
    setLocation(event.location);
    setPrice(event.price);
    setDescription(event.description);
    setImageUrl(event.image_url);
    setImagePath("");
    setOldImagePath(event.image_url.split("/").pop() || "");
  };

  // Update event
  const updateEvent = async () => {
    if (!editingId) return;

    let formattedTime = time;
    if (time.length === 16) formattedTime = `${time}:00`;

    const updatedEvent = {
      title,
      time: formattedTime,
      location,
      price: Number(price),
      description,
      image_url: imageUrl,
    };

    const { error } = await supabase
      .from("Events")
      .update(updatedEvent)
      .eq("id", editingId);

    if (error) {
      alert("Error updating event: " + error.message);
    } else {
      resetForm();
      fetchEvents();
    }
  };

  // Delete event
  const deleteEvent = async (id: string) => {
    const event = events.find((e) => e.id === id);
    if (event?.image_url) {
      const imgPath = event.image_url.split("/").pop() || "";
      await supabase.storage.from("event-images").remove([imgPath]);
    }

    const { error } = await supabase.from("Events").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      fetchEvents();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setTime("");
    setLocation("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setImagePath("");
    setOldImagePath("");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Panel</h1>
      </div>

      {/* Event Form */}
      <div className="bg-white border rounded-xl p-6 shadow-lg mb-10 max-w-2xl space-y-3">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="border p-2 w-full rounded"
        />

        {imageUrl && (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="h-40 w-full object-cover rounded mt-2"
            />
            <button
              onClick={deleteImage}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete Image
            </button>
          </div>
        )}

        {editingId ? (
          <div className="space-x-2">
            <button
              onClick={updateEvent}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Event
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={addEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>
        )}
      </div>

      {/* Event List */}
      <ul>
        {events.map((event) => (
          <li
            key={event.id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <strong>{event.title}</strong> — {new Date(event.time).toLocaleString()} — {event.location} (${event.price})
            </div>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(event)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventPanel;
