import { useEffect, useState } from 'react';

interface CityTimeProps {
  city: string;
}

const getTime = (date: Date) => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

export default function CityTime({ city }: CityTimeProps) {
  const [date, setDate] = useState(new Date());

  const changeTime = () => setTimeout(() => setDate(new Date()), 1000);

  useEffect(() => {
    const timer = changeTime();

    return () => clearTimeout(timer);
  }, [date]);

  return (
    <span>
      {city} {getTime(date)}
    </span>
  );
}
