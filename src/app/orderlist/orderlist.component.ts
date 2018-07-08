import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
    selector: 'app-orderlist',
    templateUrl: './orderlist.component.html',
    styleUrls: ['./orderlist.component.scss']
})

export class OrderlistComponent implements OnInit {

    transactions: {
        code: number,
        ItemName: string,
        PrevQty: number,
        CurrentQty: number,
        ReqQty: number,
        StoreStock: number,
        WIPStock: number,
        QtyonOrder: number,
        LeadTime: number,
        MOQ: number,
        NetQty: number,
        Supplier: string,
    }[];
    //for plan no dropdown
    cars: SelectItem[];
    selectedCar: string;
    //for date
    dates: Date[];
    rangeDates: Date[];
    minDate: Date;
    maxDate: Date;
    es: any;
    tr: any;
    invalidDates: Array<Date>

    text: string;

    selectedCities: string[] = [];
    selectedCategories: string[] = ['Technology', 'Sports'];
    checked: boolean = false;
    constructor() { 
        this.cars = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'},
        ];
    }

    ngOnInit() {
        this.transactions = [
            {
                code: 2156,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 2150226,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 21029,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 215369,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 36639,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 965639,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 365839,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 215639,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 215639,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 215639,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            },
            {
                code: 215639,
                ItemName: 'CableT 8X0.14 (CAT 6) -',
                PrevQty: 1653,
                CurrentQty: 1035,
                ReqQty: 2688.00,
                StoreStock: 1745.00,
                WIPStock: 0.00,
                QtyonOrder: 0.00,
                LeadTime: 30,
                MOQ: 305,
                NetQty: 915.00,
                Supplier: 'Global Sales and Service'
            }
        ];

        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }
        this.tr = {
            firstDayOfWeek : 1
        }
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
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
        this.invalidDates = [today,invalidDate];
    
    }

}
