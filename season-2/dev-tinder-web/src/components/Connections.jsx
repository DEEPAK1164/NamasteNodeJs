import React, { useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { BASE_URL } from '../utils/constants';

const Connections = () => {
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );
      console.log(res);
    } catch (err) {
      // TODO: handle error case
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []); // Dependency array ensures this runs only once

  return (
    <div>
      Connections page
    </div>
  );
};

export default Connections;
