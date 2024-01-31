import html2pdf from 'html2pdf.js';

const GeneratePDF = ({ items, totalPrice, taxRate, taxPrice, discRate, discPrice, totalPriceWithTax }) => {
    const itemContent = document.getElementById('billing-items').innerHTML;
    const sumContent = document.getElementById('billing-sum').innerHTML;
    const header = document.getElementById('billing-header').innerHTML;
    const date = document.getElementById('date').innerHTML;
    const sum = document.createElement('sum');
    sum.innerHTML = header + date + itemContent + sumContent;

    html2pdf(sum,{
        margin: 5,
        filename: 'invoice-doc.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      });
    };
    

export default GeneratePDF;
