import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  //for tans ID
  public transation: SelectItem[];
  public selectedId: string;
  //for date
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  tr: any;
  invalidDates: Array<Date>
  //for suppiler
  public suppiler: SelectItem[];
  public suppilerDetail: string;
  //for suppilertype
  public suppilertype: SelectItem[];
  public suppilerTypeDetail: string;
  //po status
  public selectedValue: string;
  //table
  public sales: any[];
  public taxs: any[];
  public display: boolean = false;
  constructor() {
    //for tans ID
    this.transation = [
      { label: '10389/18', value: '10389/18' },
      { label: '10390/18', value: '10390/18' },
      { label: '10381/18', value: '10381/18' },
      { label: '112698/17', value: '112698/17' },
      { label: '112598/17', value: '112598/17' },
      { label: '2548/16', value: '2548/16' },
      { label: '245687/16', value: '245687/16' },
      { label: '2546/15', value: '2546/15' },
      { label: '36597/14', value: '36597/14' },
      { label: '68864/12', value: '68864/12' },
    ];
    //for suppiler
    this.suppiler = [
      { label: 'amresh kumar', value: 'amresh kumar' },
      { label: 'kanhaiya kr yadav', value: 'kanhaiya kr yadav' },
      { label: 'Rajesh patel', value: 'Rajesh patel'},
      
    ];
    //for suppilertype
    this.suppilertype = [
      { label: 'LOCAL', value: 'LOCAL' },
      { label: 'NATIONAL', value: 'NATIONAL' },
      { label: 'INTERNATIONAL', value: 'INTERNATIONAL'},
      
    ];
    
    
  }

  ngOnInit() {
    //for date
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
    this.tr = {
      firstDayOfWeek: 1
    }
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];

    this.sales = [
      { code: '0215', itemName: 'MMM', desc: 'Good for this', qty: '3', packing: '0.00', noprPkg: '0.00', rate: '235.25',  amount: '8954.23' },
      { code: '3325', itemName: 'TTT', desc: 'Good for this', qty: '5', packing: '0.00', noprPkg: '0.00', rate: '5576.99', amount: '265493.25' },
      { code: '0215', itemName: 'MMM', desc: 'Good for this', qty: '3', packing: '0.00', noprPkg: '0.00', rate: '235.25',  amount: '8954.23' },
      { code: '3325', itemName: 'TTT', desc: 'Good for this', qty: '5', packing: '0.00', noprPkg: '0.00', rate: '5576.99', amount: '265493.25' },
      { code: '0215', itemName: 'MMM', desc: 'Good for this', qty: '3', packing: '0.00', noprPkg: '0.00', rate: '235.25',  amount: '8954.23' },
      { code: '3325', itemName: 'TTT', desc: 'Good for this', qty: '5', packing: '0.00', noprPkg: '0.00', rate: '5576.99', amount: '265493.25' },
      { code: '0215', itemName: 'MMM', desc: 'Good for this', qty: '3', packing: '0.00', noprPkg: '0.00', rate: '235.25',  amount: '8954.23' },
      { code: '3325', itemName: 'TTT', desc: 'Good for this', qty: '5', packing: '0.00', noprPkg: '0.00', rate: '5576.99', amount: '265493.25' },
      { code: '0215', itemName: 'MMM', desc: 'Good for this', qty: '3', packing: '0.00', noprPkg: '0.00', rate: '235.25',  amount: '8954.23' },
      { code: '3325', itemName: 'TTT', desc: 'Good for this', qty: '5', packing: '0.00', noprPkg: '0.00', rate: '5576.99', amount: '265493.25' },
      ];

      this.taxs = [
        { name: 'GST', rate: '2556', amount: '254684'}
      ]
  }
  showDialog() {
    this.display = true;
  }
}
