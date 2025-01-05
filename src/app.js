document.addEventListener('alpine:init', () => {
  Alpine.data('billGenerator', () => ({
    billTo: { name: '', address: '', phone: '' },
    invoice: { date: '', paymentDate: '' },
    from: { name: '', address: '', phone: '', ruc: '', timbrado: '' },
    items: [{ 
      sno: 1, 
      name: '', 
      description: '', 
      quantity: 0, 
      amount: 0, 
      total: 0,
      hasDiscount: false,
      discountPercentage: 0 
    }],
    tax: 0,
    notes: '',
    templates: [
      { name: 'Template 1', imageUrl: 'https://via.placeholder.com/200x300?text=Template+1' },
      { name: 'Template 2', imageUrl: 'https://via.placeholder.com/200x300?text=Template+2' },
      { name: 'Template 3', imageUrl: 'https://via.placeholder.com/200x300?text=Template+3' },
      { name: 'Template 4', imageUrl: 'https://via.placeholder.com/200x300?text=Template+4' },
      { name: 'Template 5', imageUrl: 'https://via.placeholder.com/200x300?text=Template+5' },
      { name: 'Template 6', imageUrl: 'https://via.placeholder.com/200x300?text=Template+6' },
      { name: 'Template 10', imageUrl: 'https://via.placeholder.com/57x38?text=Template+10' },
    ],

    init() {
      this.loadData();
    },

    addItem() {
      this.items.push({ sno: this.items.length + 1, name: '', description: '', quantity: 0, amount: 0, total: 0 });
    },

    calculateSubTotal() {
      return this.items.reduce((sum, item) => {
        const baseTotal = item.quantity * item.amount;
        if (item.hasDiscount && item.discountPercentage) {
          const discount = (baseTotal * item.discountPercentage) / 100;
          return sum + (baseTotal - discount);
        }
        return sum + baseTotal;
      }, 0).toFixed(2);
    },

    calculateGrandTotal() {
      const subTotal = parseFloat(this.calculateSubTotal());
      const taxAmount = subTotal * (this.tax / 100);
      return (subTotal + taxAmount).toFixed(2);
    },

    saveData() {
      localStorage.setItem('billData', JSON.stringify({
        billTo: this.billTo,
        invoice: this.invoice,
        from: this.from,
        items: this.items,
        tax: this.tax,
        notes: this.notes
      }));
      alert('Data saved successfully!');
    },

    loadData() {
      const savedData = localStorage.getItem('billData');
      if (savedData) {
        const data = JSON.parse(savedData);
        this.billTo = data.billTo;
        this.invoice = data.invoice;
        this.from = data.from;
        this.items = data.items;
        this.tax = data.tax;
        this.notes = data.notes;
      }
    },

    clearData() {
      if (confirm('Are you sure you want to clear all data?')) {
        localStorage.removeItem('billData');
        this.billTo = { name: '', address: '', phone: '' };
        this.invoice = { date: '', paymentDate: '' };
        this.from = { name: '', address: '', phone: '' };
        this.items = [{ sno: 1, name: '', description: '', quantity: 0, amount: 0, total: 0 }];
        this.tax = 0;
        this.notes = '';
      }
    },

    selectTemplate(template) {
      alert(`Selected template: ${template.name}`);
    }
  }));
});
