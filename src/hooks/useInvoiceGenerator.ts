import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface InvoiceData {
  order: {
    id: string;
    order_number: string;
    created_at: string;
    total_amount: number;
    subtotal: number;
    tax_amount: number | null;
    shipping_amount: number | null;
    billing_address: any;
    payment_method: string | null;
  };
  items: Array<{
    id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    products: {
      name: string;
    };
  }>;
}

export const useInvoiceGenerator = () => {
  const generateInvoice = useCallback(async (invoiceData: InvoiceData) => {
    try {
      // Create a simple HTML invoice
      const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${invoiceData.order.order_number}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #3B82F6; padding-bottom: 20px; }
            .company-name { font-size: 28px; font-weight: bold; color: #3B82F6; margin-bottom: 10px; }
            .invoice-title { font-size: 24px; margin-bottom: 20px; }
            .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .billing-info { flex: 1; }
            .order-info { flex: 1; text-align: right; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .items-table th { background-color: #f8f9fa; font-weight: bold; }
            .total-section { text-align: right; }
            .total-row { margin: 5px 0; }
            .grand-total { font-size: 18px; font-weight: bold; border-top: 2px solid #3B82F6; padding-top: 10px; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Your Company Name</div>
            <div>123 Business Street, City, State 12345</div>
            <div>Phone: (555) 123-4567 | Email: info@company.com</div>
          </div>

          <h1 class="invoice-title">INVOICE</h1>

          <div class="invoice-details">
            <div class="billing-info">
              <h3>Bill To:</h3>
              <div><strong>${invoiceData.order.billing_address.firstName} ${invoiceData.order.billing_address.lastName}</strong></div>
              <div>${invoiceData.order.billing_address.address}</div>
              <div>${invoiceData.order.billing_address.city}, ${invoiceData.order.billing_address.state} ${invoiceData.order.billing_address.zipCode}</div>
              <div>${invoiceData.order.billing_address.email}</div>
            </div>
            <div class="order-info">
              <div><strong>Invoice #:</strong> ${invoiceData.order.order_number}</div>
              <div><strong>Order ID:</strong> ${invoiceData.order.id}</div>
              <div><strong>Date:</strong> ${new Date(invoiceData.order.created_at).toLocaleDateString()}</div>
              <div><strong>Payment Method:</strong> ${invoiceData.order.payment_method || 'N/A'}</div>
            </div>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map(item => `
                <tr>
                  <td>${item.products.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.unit_price.toFixed(2)}</td>
                  <td>$${item.total_price.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row">Subtotal: $${invoiceData.order.subtotal.toFixed(2)}</div>
            ${invoiceData.order.tax_amount ? `<div class="total-row">Tax: $${invoiceData.order.tax_amount.toFixed(2)}</div>` : ''}
            ${invoiceData.order.shipping_amount ? `<div class="total-row">Shipping: $${invoiceData.order.shipping_amount.toFixed(2)}</div>` : ''}
            <div class="total-row grand-total">Total: $${invoiceData.order.total_amount.toFixed(2)}</div>
          </div>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>For questions about this invoice, please contact us at support@company.com</p>
          </div>
        </body>
        </html>
      `;

      // Create and download the invoice
      const blob = new Blob([invoiceHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoiceData.order.order_number}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Invoice downloaded",
        description: "Your invoice has been downloaded as an HTML file.",
      });

    } catch (error) {
      console.error('Error generating invoice:', error);
      toast({
        title: "Failed to generate invoice",
        description: "There was an error generating your invoice. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  return { generateInvoice };
};