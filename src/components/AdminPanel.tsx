import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for routing
import supabase from "../supabase-client";

interface Animal {
  id: string;
  created_at: string;
  name: string;
  age: number;
  gender: string;
  breed: string;
  location: string;
  description: string;
  image_url: string;
  isUrgent: boolean;
}

function AdminPanel() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // form state
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const navigate = useNavigate(); // ✅ for redirect

  // fetch animals
  const fetchAnimals = async () => {
    const { data, error } = await supabase
      .from("Gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setAnimals(data || []);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  // add new animal
  const addAnimal = async () => {
    if (!name || age === "") {
      alert("Name and age are required");
      return;
    }

    const newAnimal = {
      name,
      age: Number(age),
      gender,
      breed,
      location,
      description,
      image_url: imageUrl,
      isUrgent,
    };

    const { error } = await supabase.from("Gallery").insert([newAnimal]);

    if (error) {
      alert("Error adding animal: " + error.message);
    } else {
      resetForm();
      fetchAnimals();
    }
  };

  // delete animal
  const deleteAnimal = async (id: string) => {
    const { error } = await supabase.from("Gallery").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      fetchAnimals();
    }
  };

  // start editing
  const startEdit = (animal: Animal) => {
    setEditingId(animal.id);
    setName(animal.name);
    setAge(animal.age);
    setGender(animal.gender);
    setBreed(animal.breed);
    setLocation(animal.location);
    setDescription(animal.description);
    setImageUrl(animal.image_url);
    setIsUrgent(animal.isUrgent);
  };

  // update animal
  const updateAnimal = async () => {
    if (!editingId) return;

    const updatedAnimal = {
      name,
      age: Number(age),
      gender,
      breed,
      location,
      description,
      image_url: imageUrl,
      isUrgent,
    };

    const { error } = await supabase
      .from("Gallery")
      .update(updatedAnimal)
      .eq("id", editingId);

    if (error) {
      alert("Error updating animal: " + error.message);
    } else {
      resetForm();
      fetchAnimals();
    }
  };

  // reset form
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setAge("");
    setGender("");
    setBreed("");
    setLocation("");
    setDescription("");
    setImageUrl("");
    setIsUrgent(false);
  };

  // ✅ logout (later connect to supabase.auth.signOut)
  const handleLogout = async () => {
    try {
      // placeholder for supabase auth (later you’ll replace with real signOut)
      // await supabase.auth.signOut();
      navigate("/"); // ✅ redirect to homepage
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <section id="admin" className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="bg-white border rounded-xl p-6 shadow-lg mb-10 max-w-2xl space-y-3">
        <input
          type="text"
          placeholder="Animal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
          />
          <span>Urgent</span>
        </label>

        {editingId ? (
          <div className="space-x-2">
            <button
              onClick={updateAnimal}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Animal
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
            onClick={addAnimal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Animal
          </button>
        )}
      </div>

      {/* List */}
      <ul>
        {animals.map((animal) => (
          <li
            key={animal.id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <strong>{animal.name}</strong> ({animal.age}y, {animal.gender}) —{" "}
              {animal.breed}, {animal.location}{" "}
              {animal.isUrgent && (
                <span className="text-red-600 font-bold ml-2">URGENT</span>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(animal)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAnimal(animal.id)}
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
}

export default AdminPanel;
