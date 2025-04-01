import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const isValidDateAndFuture = (date) => {
  const [day, month, year] = date.split("/").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();

  if (day < 1 || day > daysInMonth || month < 1 || month > 12) {
    return false;
  }

  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate >= today;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Le nom doit contenir entre 8 et 15 caractères")
    .max(15, "Le nom doit contenir entre 8 et 15 caractères")
    .required("Le nom est requis"),
  dueDate: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Format attendu : jj/mm/AAAA")
    .test("isValidDateAndFuture", "La date est invalide ou antérieure à aujourd'hui", (value) => {
      if (!value) return false;
      return isValidDateAndFuture(value);
    })
    .required("La date est requise"),
  priority: yup
    .string()
    .oneOf(["Basse", "Moyenne", "Elevée"], "Priorité invalide")
    .required("La priorité est requise"),
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      priority: "Basse",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    reset();
  };

  return (
    <Container className="mt-5">
      <h2>Formulaire</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" {...register("name")} />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label>Date Due</Form.Label>
          <Form.Control type="text" placeholder="jj/mm/AAAA" {...register("dueDate")} />
          {errors.dueDate && <p className="text-danger">{errors.dueDate.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="priority">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register("priority")}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
          {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Soumettre
        </Button>
      </Form>
    </Container>
  );
}

export default App;
