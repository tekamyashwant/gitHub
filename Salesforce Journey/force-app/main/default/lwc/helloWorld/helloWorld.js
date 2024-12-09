import { LightningElement } from 'lwc';
import jsPDF from '@salesforce/resourceUrl/jsPDF';
import html2canvas from '@salesforce/resourceUrl/html2canvas';
import { loadScript } from 'lightning/platformResourceLoader';
export default class HelloWorld extends LightningElement {
    valuefromJs='Value from Js file.';
    async renderedCallback() {
        if (!this.isScriptLoaded) {
            await Promise.all([
                loadScript(this, jsPDF),
                loadScript(this, html2canvas)
            ]);
            this.isScriptLoaded = true;
            console.log('isScriptLoaded',this.isScriptLoaded);
            }
        }

    async clickHandler(){
            let elementHTML = this.template.querySelector('.lwcidd');
            console.log('elementHTML',elementHTML);
            // try{
            //     let canv=await html2canvas(elementHTML, { useCORS: true })
            //     console.log('image1');

            //     const imgData = canv.toDataURL('image/png', 1.0);
            //     console.log('image2');

            //     window.jsPDF = window.jspdf.jsPDF;
            //     console.log('image3');

            //     var pdf = new jsPDF({
            //         orientation: 'landscape'
            //     });
            //     console.log('image');
            //     pdf.addImage(imgData, 'imgData', 0, 0);
            //     console.log('pdf');
            //     pdf.save("download.pdf");
            // }catch(err){
            //     console.log('err',err);
            // }

            // await html2canvas(elementHTML, { useCORS: true }).then(canv => {
            //     console.log('image1');

            //     const imgData = canv.toDataURL('image/png', 1.0);
            //     console.log('image2');

            //     window.jsPDF = window.jspdf.jsPDF;
            //     console.log('image3');

            //     var pdf = new jsPDF({
            //         orientation: 'landscape'
            //     });
            //     console.log('image');
            //     pdf.addImage(imgData, 'imgData', 0, 0);
            //     console.log('pdf');
            //     pdf.save("download.pdf");
                
            // }).catch(res => {
            //     throw new Error(res);
            // });  
    }
}