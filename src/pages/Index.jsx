import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ItemDetails from "../components/ItemDetails";
import FormHeader from '../components/FormHeader';
import InvoiceInformation from '../components/InvoiceInformation';
import { RefreshCw } from "lucide-react";
import { templates } from "../utils/templateRegistry";

const noteOptions = [
  "¡Gracias por elegirnos hoy! Esperamos que su experiencia de compra haya sido agradable y sin problemas. Su satisfacción es importante para nosotros y esperamos atenderle nuevamente pronto. Conserve este recibo para cualquier devolución o cambio.",
  "¡Su compra apoya a nuestra comunidad! Creemos en retribuir y trabajar por un futuro mejor. Gracias por ser parte de nuestro viaje. Apreciamos su confianza y esperamos verle pronto.",
  "¡Valoramos sus comentarios! Ayúdenos a mejorar compartiendo su opinión en el enlace de la encuesta por mensaje de texto. Sus opiniones nos ayudan a servirle mejor y mejorar su experiencia de compra. ¡Gracias por comprar con nosotros!",
  "¿Sabía que puede ahorrar más con nuestro programa de fidelización? Pregunte sobre él en su próxima visita y gane puntos en cada compra. Es nuestra forma de agradecerle por ser un cliente fiel. ¡Hasta la próxima!",
  "¿Necesita ayuda con su compra? ¡Estamos aquí para ayudar! Contacte a nuestro servicio al cliente o visite nuestro sitio web para más información. Estamos comprometidos a brindarle el mejor servicio posible.",
  "Conserve este recibo para devoluciones o cambios.",
  "¡Cada compra hace la diferencia! Estamos dedicados a prácticas ecológicas y sostenibilidad. Gracias por apoyar un planeta más verde con nosotros. Juntos podemos construir un mejor mañana.",
  "¡Que tenga un excelente día!",
  "Gracias por comprar con nosotros hoy. ¿Sabía que puede devolver o cambiar sus artículos dentro de los 30 días con este recibo? Queremos asegurarnos de que esté satisfecho con su compra, así que no dude en volver si necesita ayuda.",
  "Negocio ecológico. Este recibo es reciclable.",
  "¡Esperamos que haya disfrutado su experiencia de compra! Recuerde, por cada amigo que refiera, puede ganar recompensas exclusivas. Visite www.example.com/refer para más detalles. ¡Esperamos darle la bienvenida nuevamente pronto!",
  "¡Gracias por elegirnos! Apreciamos su preferencia y esperamos atenderle nuevamente. Conserve este recibo para cualquier consulta o devolución futura.",
  "Su compra apoya a negocios locales y nos ayuda a continuar nuestra misión. ¡Gracias por ser un cliente valioso. Esperamos verle pronto!",
  "Esperamos que haya tenido una excelente experiencia de compra hoy. Si tiene algún comentario, por favor compártalo con nosotros en nuestro sitio web. Siempre estamos aquí para ayudarle.",
  "¡Gracias por su visita! Recuerde, ofrecemos descuentos exclusivos a clientes que regresan. Revise su correo electrónico para ofertas especiales en su próxima compra.",
  "Su satisfacción es nuestra principal prioridad. Si necesita ayuda o tiene preguntas sobre su compra, no dude en contactarnos. ¡Que tenga un excelente día!",
  "¡Amamos a nuestros clientes! Gracias por apoyar nuestro negocio. Síganos en redes sociales para actualizaciones sobre promociones y nuevos productos. ¡Hasta la próxima!",
  "¡Cada compra cuenta! Estamos comprometidos a generar un impacto positivo, y su apoyo nos ayuda a alcanzar nuestros objetivos. ¡Gracias por comprar con nosotros hoy!",
  "Esperamos que haya encontrado todo lo que necesitaba. Si no fue así, por favor háganoslo saber para mejorar su experiencia. Sus comentarios nos ayudan a servirle mejor. ¡Gracias!",
  "¡Gracias por visitarnos! ¿Sabía que puede ahorrar más con nuestro programa de recompensas? ¡Pregunte sobre él durante su próxima visita y comience a ganar puntos hoy!",
  "Apreciamos su confianza en nosotros. Si alguna vez necesita ayuda con su pedido, visite nuestro sitio web o llame a servicio al cliente. ¡Estamos aquí para ayudar!"
];

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

const Index = () => {
  const navigate = useNavigate();
  const [billTo, setBillTo] = useState({ name: "", address: "", phone: "" });
  const [invoice, setInvoice] = useState({
    date: "",
    paymentDate: "",
    number: "",
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [items, setItems] = useState([]);
  const [taxPercentage, settaxPercentage] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");

  const refreshNotes = () => {
    const randomIndex = Math.floor(Math.random() * noteOptions.length);
    setNotes(noteOptions[randomIndex]);
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || { name: "", address: "", phone: "" });
      setInvoice(
        parsedData.invoice || { date: "", paymentDate: "", number: "" }
      );
      setYourCompany(
        parsedData.yourCompany || { name: "", address: "", phone: "" }
      );
      setItems(parsedData.items || []);
      settaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
    } else {
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
    }
  }, []);

  useEffect(() => {
    const formData = {
      billTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    billTo,
    invoice,
    yourCompany,
    items,
    taxPercentage,
    notes,
    taxAmount,
    subTotal,
    grandTotal,
  ]);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
    updateTotals();
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    const calculatedSubTotal = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
    setSubTotal(calculatedSubTotal.toFixed(2));
    return calculatedSubTotal;
  };

  const calculateTaxAmount = (subTotal) => {
    return ((subTotal * taxPercentage) / 100).toFixed(2);
  };

  const calculateGrandTotal = (subTotal, taxAmount) => {
    return (parseFloat(subTotal) + parseFloat(taxAmount)).toFixed(2);
  };

  const updateTotals = () => {
    const subTotal = calculateSubTotal();
    const taxAmount = calculateTaxAmount(subTotal);
    const grandTotal = calculateGrandTotal(subTotal, taxAmount);

    setTaxAmount(taxAmount);
    setGrandTotal(grandTotal);
  };

  const handleTaxPercentageChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    settaxPercentage(taxRate);
    updateTotals();
  };

  useEffect(() => {
    updateTotals();
  }, [items, taxPercentage]);

  const handleTemplateClick = (templateNumber) => {
    const formData = {
      billTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
    };
    navigate("/template", {
      state: { formData, selectedTemplate: templateNumber },
    });
  };

  const fillDummyData = () => {
    setBillTo({
      name: "Juan Pérez",
      address: "Calle 123, Ciudad, País",
      phone: "(555) 123-4567",
    });
    setInvoice({
      date: new Date().toISOString().split("T")[0],
      paymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({
      name: "Su Compañía",
      address: "Calle 789, Ciudad, País",
      phone: "(555) 555-5555",
    });
    setItems([
      {
        name: "Producto A",
        description: "Artículo de alta calidad",
        quantity: 2,
        amount: 50,
        total: 100,
      },
      {
        name: "Servicio B",
        description: "Servicio profesional",
        quantity: 1,
        amount: 200,
        total: 200,
      },
      {
        name: "Producto C",
        description: "Otro producto excelente",
        quantity: 3,
        amount: 30,
        total: 90,
      },
      {
        name: "Servicio D",
        description: "Otro servicio profesional",
        quantity: 2,
        amount: 150,
        total: 300,
      },
      {
        name: "Producto E",
        description: "Otro producto más",
        quantity: 1,
        amount: 75,
        total: 75,
      },
      {
        name: "Servicio F",
        description: "Otro servicio más",
        quantity: 4,
        amount: 100,
        total: 400,
      },
    ]);
    settaxPercentage(10);
    calculateSubTotal();
    setNotes("¡Gracias por su compra!");
  };

  const clearForm = () => {
    setBillTo({ name: "", address: "", phone: "" });
    setInvoice({
      date: "",
      paymentDate: "",
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({ name: "", address: "", phone: "" });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    settaxPercentage(0);
    setNotes("");
    localStorage.removeItem("formData");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <FormHeader 
        onClear={clearForm}
        onFillDummy={fillDummyData}
        onNavigateToReceipt={() => navigate("/receipt", {
          state: {
            formData: {
              billTo,
              invoice,
              yourCompany,
              items,
              taxPercentage,
              notes,
            },
          },
        })}
      />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form>
            <BillToSection
              billTo={billTo}
              handleInputChange={handleInputChange(setBillTo)}
            />
            <InvoiceInformation 
              invoice={invoice}
              handleInputChange={handleInputChange(setInvoice)}
            />
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Su Compañía</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Nombre"
                  value={yourCompany.name}
                  onChange={handleInputChange(setYourCompany)}
                  name="name"
                />
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Teléfono"
                  value={yourCompany.phone}
                  onChange={handleInputChange(setYourCompany)}
                  name="phone"
                />
              </div>
              <FloatingLabelInput
                id="yourCompanyAddress"
                label="Dirección"
                value={yourCompany.address}
                onChange={handleInputChange(setYourCompany)}
                name="address"
                className="mt-4"
              />
            </div>
            <ItemDetails
              items={items}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
            />
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Totales</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₲ {subTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tasa de impuesto (%):</span>
                <input
                  type="number"
                  value={taxPercentage}
                  onChange={(e) => handleTaxPercentageChange(e)}
                  className="w-24 p-2 border rounded"
                  min="0"
                  max="28"
                  step="1"
                />
              </div>
              <div className="flex justify-between mb-2">
                <span>Monto de impuesto:</span>
                <span>₲ {taxAmount}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₲ {grandTotal}</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium">Notas</h3>
                <button
                  type="button"
                  onClick={refreshNotes}
                  className="ml-2 p-1 rounded-full hover:bg-gray-200"
                  title="Actualizar notas"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Galería de plantillas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <div
                key={index}
                className="template-card bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleTemplateClick(index + 1)}
              >
                <img
                  src={`/assets/template${index + 1}-preview.png`}
                  alt={template.name}
                  className={`w-full ${
                    template.name === "Template 10"
                      ? "h-[38px] w-[57px]"
                      : "h-50"
                  } object-cover rounded mb-2`}
                />
                <p className="text-center font-medium">{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
