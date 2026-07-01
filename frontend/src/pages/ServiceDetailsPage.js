import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  const fetchService = useCallback(async () => {
    try {
      const res = await API.get(`/services/${id}`);
      setService(res.data.service);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  if (!service) {
    return <h2 className="loading">Loading service...</h2>;
  }

  return (
    <div className="container">
      <div className="card details-card">
        <h1>{service.title}</h1>

        <p className="details-description">
          {service.description}
        </p>

        <div className="details-meta">
          <p><strong>Price:</strong> ₹{service.price}</p>
          <p><strong>Duration:</strong> {service.duration} mins</p>
          <p><strong>Category:</strong> {service.category}</p>
          <p>
            <strong>Status:</strong>{" "}
            {service.isAvailable ? "Available" : "Not Available"}
          </p>
        </div>

        {service.isAvailable && (
          <Link to={`/booking/${service._id}`}>
            <button className="book-btn">Book Now</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ServiceDetailsPage;