import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    priority: "Basse",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Container className="mt-5">
      <h2>Formulaire</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label>Date Due</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="priority">
          <Form.Label>Priorité</Form.Label>
          <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="isCompleted">
          <Form.Check
            type="checkbox"
            label="Complété"
            name="isCompleted"
            checked={formData.isCompleted}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Soumettre
        </Button>
      </Form>
    </Container>
  );
}

export default App;
