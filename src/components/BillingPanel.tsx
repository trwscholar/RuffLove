import React, { useState, useEffect } from "react";
import supabase from "../supabase-client";
import {
  Stethoscope,
  Home,
  UtensilsCrossed,
  Shield,
  Heart,
  Pill,
  Syringe,
  DollarSign,
  ShoppingCart,
  Truck,
  Scissors,
  Dog,
  Cat,
  Activity,
  ClipboardList,
} from "lucide-react";

interface BillingItem {
  id: number;
  title: string;
  description: string;
  amount: number;
  icon: string;
}

const ICON_OPTIONS = [
  { name: "Heart", icon: Heart, color: "text-red-500" },
  { name: "Stethoscope", icon: Stethoscope, color: "text-blue-500" },
  { name: "Home", icon: Home, color: "text-green-500" },
  { name: "UtensilsCrossed", icon: UtensilsCrossed, color: "text-orange-500" },
  { name: "Shield", icon: Shield, color: "text-purple-500" },
  { name: "Pill", icon: Pill, color: "text-pink-500" },
  { name: "Syringe", icon: Syringe, color: "text-teal-500" },
  { name: "DollarSign", icon: DollarSign, color: "text-green-600" },
  { name: "ShoppingCart", icon: ShoppingCart, color: "text-yellow-500" },
  { name: "Truck", icon: Truck, color: "text-gray-600" },
  { name: "Scissors", icon: Scissors, color: "text-indigo-500" },
  { name: "Dog", icon: Dog, color: "text-amber-600" },
  { name: "Cat", icon: Cat, color: "text-orange-600" },
  { name: "Activity", icon: Activity, color: "text-red-600" },
  { name: "ClipboardList", icon: ClipboardList, color: "text-slate-600" },
];

const BillingPanel = () => {
  const [bills, setBills] = useState<BillingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: 0,
    icon: "Heart",
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
      icon: bill.icon || "Heart",
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
        icon: formData.icon,
      })
      .eq("id", editingId);

    if (error) {
      console.error("Error updating bill:", error);
      alert("Failed to update bill");
    } else {
      alert("Bill updated successfully!");
      setEditingId(null);
      setFormData({ title: "", description: "", amount: 0, icon: "Heart" });
      fetchBills();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", amount: 0, icon: "Heart" });
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
        icon: formData.icon,
      },
    ]);

    if (error) {
      console.error("Error creating bill:", error);
      alert("Failed to create bill");
    } else {
      alert("Bill created successfully!");
      setFormData({ title: "", description: "", amount: 0, icon: "Heart" });
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

  const getIconComponent = (iconName: string) => {
    const iconOption = ICON_OPTIONS.find((opt) => opt.name === iconName);
    return iconOption || ICON_OPTIONS[0];
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
            <label className="block text-sm font-medium mb-1">Icon</label>
            <select
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            >
              {ICON_OPTIONS.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <span>Preview:</span>
              {React.createElement(getIconComponent(formData.icon).icon, {
                className: `w-6 h-6 ${getIconComponent(formData.icon).color}`,
              })}
            </div>
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
            {bills.map((bill) => {
              const IconComponent = getIconComponent(bill.icon || "Heart");
              return (
                <div
                  key={bill.id}
                  className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                        {React.createElement(IconComponent.icon, {
                          className: `w-6 h-6 ${IconComponent.color}`,
                        })}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{bill.title}</h4>
                        {bill.description && (
                          <p className="text-gray-600 text-sm mt-1">{bill.description}</p>
                        )}
                        <p className="text-red-500 font-bold text-xl mt-2">
                          RM {parseFloat(bill.amount.toString()).toLocaleString()}
                        </p>
                      </div>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingPanel;
