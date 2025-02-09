import { Injectable } from '@angular/core';
import { Prenda } from '../../app/ropa.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private prendas: Prenda[] = [];
  private prendasSubject = new BehaviorSubject<Prenda[]>([]);
  private storageKey = 'inventario_data';

  constructor() {
    const savedData = localStorage.getItem(this.storageKey);
    this.prendas = savedData ? JSON.parse(savedData) : [];

    if (this.prendas.length === 0) {
      this.agregarPrenda({
        id: 1,
        nombre: 'Vestido Rojo',
        disenador: 'Diseñador A',
        anoColeccion: 2020,
        precio: 300,
        imagen: undefined // Asegurar que el campo imagen exista
      });
      this.agregarPrenda({
        id: 2,
        nombre: 'Blusa Azul',
        disenador: 'Diseñador B',
        anoColeccion: 2021,
        precio: 150,
        imagen: undefined
      });
    }

    // Notificar a los observadores con los datos cargados desde localStorage
    this.prendasSubject.next(this.prendas);
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.prendas));
  }

  getPrendas(): Prenda[] {
    return [...this.prendas]; // Devolver una copia para evitar mutaciones accidentales
  }

  agregarPrenda(prenda: Prenda) {
    const nuevaPrenda: Prenda = {
      ...prenda,
      id: prenda.id || Date.now(),
      imagen: prenda.imagen || undefined // Asegurar que la imagen se guarde
    };

    const existe = this.prendas.some(p =>
      p.nombre.toLowerCase() === nuevaPrenda.nombre.toLowerCase() &&
      p.disenador.toLowerCase() === nuevaPrenda.disenador.toLowerCase()
    );

    if (!existe) {
      this.prendas.push(nuevaPrenda);
      this.prendasSubject.next(this.prendas);
      this.saveToLocalStorage(); // Guardar en localStorage después de agregar
    }
  }

  calcularValorTotal(): number {
    return this.prendas.reduce((total, p) => total + p.precio, 0);
  }

  getPrendasObservable() {
    return this.prendasSubject.asObservable();
  }

  buscarPorDiseñador(diseñador: string): Prenda[] {
    return this.prendas.filter(p => p.disenador === diseñador);
  }

  ordenarPorAño(): Prenda[] {
    return [...this.prendas].sort((a, b) => a.anoColeccion - b.anoColeccion);
  }

  eliminarPrenda(id: number): void {
    this.prendas = this.prendas.filter(prenda => prenda.id !== id);
    this.prendasSubject.next(this.prendas);
    this.saveToLocalStorage(); // Guardar cambios en localStorage
  }
}

  


