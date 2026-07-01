import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data.services);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading services...</h2>;
  }

  return (
    <div className="container">
      <h1 className="page-title">Available Services</h1>

      <div className="service-grid">
        {services.map((service) => (
          <div key={service._id} className="card service-card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>

            <div className="service-meta">
              <span>₹{service.price}</span>
              <span>{service.duration} mins</span>
            </div>

            <p className="category">{service.category}</p>

            <Link to={`/service/${service._id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;