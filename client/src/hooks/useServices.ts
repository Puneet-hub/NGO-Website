import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  details: string;
  category: string;
}

// ✅ Backend URL (change only here in future)
const API_URL = "https://ngo-website-dhck.onrender.com";

export default function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/services`)
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  return { services, loading };
}