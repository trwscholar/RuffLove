import React, { useState, useEffect } from "react";
import supabase from "../supabase-client";

interface BillingItem {
  id: number;
  title: string;
  description: string;
  amount: number;
}

const BillingPanel = () => {
  const [bills, setBills] = useState<BillingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: 0,
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Billing")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching bills:", error);
    } else {
      setBills(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (bill: BillingItem) => {
    setEditingId(bill.id);
    setFormData({
      title: bill.title,
      description: bill.description,
      amount: bill.amount,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from("Billing")
      .update({
        title: formData.title,
        description: formData.description,
        amount: formData.amount,
      })
      .eq("id", editingId);

    if (error) {
      console.error("Error updating bill:", error);
      alert("Failed to update bill");
    } else {
      alert("Bill updated successfully!");
      setEditingId(null);
      setFormData({ title: "", description: "", amount: 0 });
      fetchBills();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", amount: 0 });
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.amount) {
      alert("Please fill in title and amount");
      return;
    }

    const { error } = await supabase.from("Billing").insert([
      {
        title: formData.title,
        description: formData.description,
        amount: formData.amount,
      },
    ]);

    if (error) {
      console.error("Error creating bill:", error);
      alert("Failed to create bill");
    } else {
      alert("Bill created successfully!");
      setFormData({ title: "", description: "", amount: 0 });
      fetchBills();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this bill?")) return;

    const { error } = await supabase.from("Billing").delete().eq("id", id);

    if (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete bill");
    } else {
      alert("Bill deleted successfully!");
      fetchBills();
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading bills...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Billing Management</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-lg mb-3">
          {editingId ? "Edit Bill" : "Add New Bill"}
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Veterinary Care Bills"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Optional description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount (RM)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., 2500"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex gap-2">
            {editingId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Bill
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Existing Bills</h3>
        {bills.length === 0 ? (
          <p className="text-gray-500">No bills found. Add your first bill above.</p>
        ) : (
          <div className="grid gap-4">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{bill.title}</h4>
                    {bill.description && (
                      <p className="text-gray-600 text-sm mt-1">{bill.description}</p>
                    )}
                    <p className="text-red-500 font-bold text-xl mt-2">
                      RM {parseFloat(bill.amount.toString()).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(bill)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(bill.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingPanel;
