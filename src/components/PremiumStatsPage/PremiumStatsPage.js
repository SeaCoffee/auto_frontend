import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PremiumStatsPage = () => {
  const { listing_id } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`/api/premium/${listing_id}/stats/`)
      .then(response => setStats(response.data))
      .catch(error => console.error('Failed to load stats', error));
  }, [listing_id]);

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Premium Stats</h2>
      <p>Total Views: {stats.views_data.total_views}</p>
      <p>Views Today: {stats.views_data.views_day}</p>
      <p>Views This Week: {stats.views_data.views_week}</p>
      <p>Views This Month: {stats.views_data.views_month}</p>
      <p>Average Price by Region: {stats.average_price_by_region}</p>
      <p>Average Price by Country: {stats.average_price_by_country}</p>
    </div>
  );
};

export default PremiumStatsPage;
