import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import supabase from '../supabase-client';

// Counter animation hook
const useCounterAnimation = (endValue: number, duration: number = 2000, isVisible: boolean = false) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration, isVisible, hasAnimated]);

  return count;
};

// Intersection Observer hook
const useIntersectionObserver = (threshold: number = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Animated cost component
const AnimatedCost: React.FC<{ cost: string; isVisible: boolean }> = ({ cost, isVisible }) => {
  const numericValue = parseInt(cost.replace(/[^\d]/g, ''));
  const animatedValue = useCounterAnimation(numericValue, 2000, isVisible);

  const formatCurrency = (value: number) => {
    return `RM ${value.toLocaleString()}`;
  };

  return (
    <span className="text-2xl font-bold text-red-500 tabular-nums">
      {formatCurrency(animatedValue)}
    </span>
  );
};

interface BillingItem {
  id: number;
  title: string;
  description: string;
  amount: number;
  icon: string;
}

const ICON_MAP: { [key: string]: { icon: any; color: string } } = {
  Heart: { icon: Heart, color: 'text-red-500' },
  Stethoscope: { icon: Stethoscope, color: 'text-blue-500' },
  Home: { icon: Home, color: 'text-green-500' },
  UtensilsCrossed: { icon: UtensilsCrossed, color: 'text-orange-500' },
  Shield: { icon: Shield, color: 'text-purple-500' },
  Pill: { icon: Pill, color: 'text-pink-500' },
  Syringe: { icon: Syringe, color: 'text-teal-500' },
  DollarSign: { icon: DollarSign, color: 'text-green-600' },
  ShoppingCart: { icon: ShoppingCart, color: 'text-yellow-500' },
  Truck: { icon: Truck, color: 'text-gray-600' },
  Scissors: { icon: Scissors, color: 'text-indigo-500' },
  Dog: { icon: Dog, color: 'text-amber-600' },
  Cat: { icon: Cat, color: 'text-orange-600' },
  Activity: { icon: Activity, color: 'text-red-600' },
  ClipboardList: { icon: ClipboardList, color: 'text-slate-600' },
};

const DonationSupport = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.3);
  const [bills, setBills] = useState<BillingItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const { data, error } = await supabase
      .from('Billing')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching bills:', error);
    } else if (data) {
      setBills(data);
      const total = data.reduce((sum, bill) => sum + parseFloat(bill.amount.toString()), 0);
      setTotalAmount(total);
    }
  };

  const getIconForBill = (iconName: string) => {
    return ICON_MAP[iconName] || ICON_MAP['Heart'];
  };

  const expenses = bills.map(bill => {
    const { icon, color } = getIconForBill(bill.icon || 'Heart');
    return {
      icon,
      label: bill.title,
      cost: `RM ${parseFloat(bill.amount.toString()).toLocaleString()}`,
      color
    };
  });

  const totalValue = useCounterAnimation(Math.round(totalAmount), 2500, isVisible);

  return (
    <section ref={sectionRef} id="donate" className="py-16 bg-pink-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4 font-rounded">
            Help Us Care for 46 Animals
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-2">
            Your donation directly supports our furry friends
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Monthly expenses breakdown:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {expenses.map((expense, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 group hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-pink-100 transition-colors duration-300">
                  <expense.icon className={`w-6 h-6 ${expense.color}`} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">{expense.label}</h3>
                </div>
              </div>
              <div className="text-right">
                <AnimatedCost cost={expense.cost} isVisible={isVisible} />
                <span className="text-gray-500 text-sm">/month</span>
              </div>
            </div>
          ))}

          {/* Total Card */}
          <div className="bg-red-500 rounded-2xl p-6 shadow-lg text-white lg:col-span-3 md:col-span-2">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Total Monthly Need</h3>
              <div className="text-4xl font-bold mb-2 tabular-nums">
                RM {totalValue.toLocaleString()}
              </div>
              <p className="opacity-90">Help us reach our goal to provide the best care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSupport;
