import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, X } from "lucide-react";
import { Button } from "./ui/Button";
import supabase from "../supabase-client";

interface EventItem {
  id: string;
  title: string;
  time: string;        // timestamp from Supabase
  location: string;
  price: number;       // int2 in Supabase
  description: string;
  image_url: string;   // from event-images bucket
}

const EventsCommunity = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Fetch events from Supabase
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("Events") // 👈 your table name
      .select("*")
      .order("time", { ascending: true }); // order by event time

    if (error) {
      console.error("Error fetching events:", error);
      return;
    }

    const mappedEvents: EventItem[] = (data || []).map((event) => ({
      id: event.id,
      title: event.title,
      time: event.time, // timestamp
      location: event.location,
      price: event.price,
      description: event.description,
      image_url: event.image_url,
    }));

    setEvents(mappedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg"
              aria-label="Close popup"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            <div className="flex flex-col md:flex-row max-h-[90vh]">
              <div className="md:w-1/2 flex-shrink-0">
                <img
                  src={selectedEvent.image_url}
                  alt={selectedEvent.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold text-red-500 mb-4">{selectedEvent.title}</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <span>
                      {new Date(selectedEvent.time).toLocaleDateString("en-MY", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span>
                      {new Date(selectedEvent.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">About This Event</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>

                <div className="bg-pink-50 p-4 rounded-xl mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Event Fee:</span>
                    <span className="text-2xl font-bold text-red-500">RM {selectedEvent.price}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    const message = encodeURIComponent(`Hi, I would like more information on ${selectedEvent.title}`);
                    window.open(`https://wa.me/60193871868?text=${message}`, '_blank');
                  }}
                >
                  Join Event • RM{selectedEvent.price}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="events" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-rounded">
            Events & Community
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Join our community events and help make a difference
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-pink-100 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3 group-hover:text-red-400 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.time).toLocaleDateString("en-MY", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(event.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>

                <button
                  className="group/btn w-full bg-red-500 text-white py-3 rounded-full font-bold hover:bg-red-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                  }}
                >
                  <span className="relative z-10">
                    Join Event • RM{event.price}
                  </span>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                    🎉
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex space-x-4 text-red-500">
            <span className="animate-pulse">🐾</span>
            <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>
              🐾
            </span>
            <span className="animate-pulse" style={{ animationDelay: "1s" }}>
              🐾
            </span>
          </div>
        </div>

        <div className="text-center">
          <button className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden">
            <span className="relative z-10">View All Events</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              📅
            </div>
          </button>
        </div>
      </div>
      </section>
    </>
  );
};

export default EventsCommunity;
