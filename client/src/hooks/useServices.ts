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

export default function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { services, loading };
}