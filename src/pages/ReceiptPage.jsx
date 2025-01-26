import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, RefreshCw, FileText, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Receipt1 from "../components/templates/Receipt1";
import Receipt2 from "../components/templates/Receipt2";
import Receipt3 from "../components/templates/Receipt3";
import Receipt4 from "../components/templates/Receipt4";
import { generateReceiptPDF } from "../utils/receiptPDFGenerator";
import { generateGSTNumber } from "../utils/invoiceCalculations";
import FloatingLabelInput from "../components/FloatingLabelInput";
import ItemDetails from "../components/ItemDetails";

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

const footerOptions = [
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
  "Apreciamos su confianza en nosotros. Si alguna vez necesita ayuda con su pedido, visite nuestro sitio web o llame a servicio al cliente. ¡Estamos aquí para ayudar!",
];

const ReceiptPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);

  const [billTo, setBillTo] = useState("");
  const [invoice, setInvoice] = useState({
    date: "",
    number: generateRandomInvoiceNumber(),
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    gst: "",
  });
  const [cashier, setCashier] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 0, amount: 0, total: 0 },
  ]);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [theme, setTheme] = useState("Receipt1");
  const [notes, setNotes] = useState("");
  const [footer, setFooter] = useState("¡Gracias por elegirnos!");

  const refreshFooter = () => {
    const randomIndex = Math.floor(Math.random() * footerOptions.length);
    setFooter(footerOptions[randomIndex]);
  };

  useEffect(() => {
    // Initialize with default values
    setInvoice((prev) => ({ ...prev, number: generateRandomInvoiceNumber() }));
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      billTo,
      invoice,
      yourCompany,
      cashier,
      items,
      taxPercentage,
      notes,
      footer,
    };
    localStorage.setItem("receiptFormData", JSON.stringify(formData));
  }, [billTo, invoice, yourCompany, items, taxPercentage, notes]);

  const handleDownloadPDF = async () => {
    if (!isDownloading && receiptRef.current) {
      setIsDownloading(true);
      try {
        await generateReceiptPDF(receiptRef.current);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

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
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateTaxAmount = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal * (taxPercentage / 100)).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const taxAmount = parseFloat(calculateTaxAmount());
    return (subTotal + taxAmount).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-3xl font-bold">Generador de Recibos</h1>
        <div className="flex items-center ml-auto">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="mr-4"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Descargando...
              </>
            ) : (
              "Descargar Recibo PDF"
            )}
          </Button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
            aria-label="Cambiar a Generador de Facturas"
          >
            <FileText size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form>
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
              <div className="relative mt-4">
                <FloatingLabelInput
                  id="yourCompanyGST"
                  label="Número de GST"
                  value={yourCompany.gst}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 15);
                    handleInputChange(setYourCompany)({
                      target: { name: "gst", value },
                    });
                  }}
                  name="gst"
                  maxLength={15}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newGST = generateGSTNumber();
                    setYourCompany((prev) => ({ ...prev, gst: newGST }));
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
                  title="Generar nuevo número de GST"
                >
                  <RotateCw size={16} />
                </button>
              </div>
              <FloatingLabelInput
                id="cashier"
                label="Cajero"
                value={cashier}
                onChange={(e) => setCashier(e.target.value)}
                name="cashier"
                className="mt-4"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Factura a</h2>
              <FloatingLabelInput
                id="billTo"
                label="Factura a"
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                name="billTo"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Información de la factura
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FloatingLabelInput
                  id="invoiceNumber"
                  label="Número de factura"
                  value={invoice.number}
                  onChange={handleInputChange(setInvoice)}
                  name="number"
                />
                <FloatingLabelInput
                  id="invoiceDate"
                  label="Fecha de la factura"
                  type="date"
                  value={invoice.date}
                  onChange={handleInputChange(setInvoice)}
                  name="date"
                />
              </div>
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
                <span>₲ {calculateSubTotal()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Impuesto (%):</span>
                <input
                  type="number"
                  value={taxPercentage}
                  onChange={(e) =>
                    setTaxPercentage(parseFloat(e.target.value) || 0)
                  }
                  className="w-24 p-2 border rounded"
                  min="0"
                  max="28"
                  step="1"
                />
              </div>
              <div className="flex justify-between mb-2">
                <span>Monto del impuesto:</span>
                <span>₲ {calculateTaxAmount()}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₲ {calculateGrandTotal()}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Notas</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium">Pie de página</h3>
                <button
                  type="button"
                  onClick={refreshFooter}
                  className="ml-2 p-1 rounded-full hover:bg-gray-200"
                  title="Actualizar pie de página"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <textarea
                value={footer}
                onChange={(e) => setFooter(e.target.value)}
                className="w-full p-2 border rounded"
                rows="2"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Vista previa del recibo</h2>
          <div className="mb-4 flex items-center">
            <h3 className="text-lg font-medium mr-4">Tipo de recibo</h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt1"
                  checked={theme === "Receipt1"}
                  onChange={() => setTheme("Receipt1")}
                  className="mr-2"
                />
                Recibo 1
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt2"
                  checked={theme === "Receipt2"}
                  onChange={() => setTheme("Receipt2")}
                  className="mr-2"
                />
                Recibo 2
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt3"
                  checked={theme === "Receipt3"}
                  onChange={() => setTheme("Receipt3")}
                  className="mr-2"
                />
                Recibo 3
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt4"
                  checked={theme === "Receipt4"}
                  onChange={() => setTheme("Receipt4")}
                  className="mr-2"
                />
                Recibo 4
              </label>
            </div>
          </div>
          <div ref={receiptRef} className="w-[380px] mx-auto border shadow-lg">
            {theme === "Receipt1" && (
              <Receipt1
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  cashier,
                  items,
                  taxPercentage,
                  notes,
                  footer,
                }}
              />
            )}
            {theme === "Receipt2" && (
              <Receipt2
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  cashier,
                  items,
                  taxPercentage,
                  notes,
                  footer,
                }}
              />
            )}
            {theme === "Receipt3" && (
              <Receipt3
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  cashier,
                  items,
                  taxPercentage,
                  notes,
                  footer,
                }}
              />
            )}
            {theme === "Receipt4" && (
              <Receipt4
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  items,
                  taxPercentage,
                  footer,
                  cashier,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
