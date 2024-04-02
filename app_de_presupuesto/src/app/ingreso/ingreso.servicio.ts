import { Ingreso } from "./ingreso.model";

export class IngresoServicio {
    ingresos: Ingreso[] = [
        new Ingreso("Salario", 4000.00),
        new Ingreso("Venta de coche", 500.00)
    ];
}