import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { InventarioService } from '../../services/inventario.service';
import { Prenda } from '../../ropa.model';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  sortOrder: 'asc' | 'desc' | 'none' = 'none';
  allPrendas: Prenda[] = [];
  displayedPrendas: Prenda[] = [];
  filteredPrendas: Prenda[] = [];
  searchTerm = '';
  pageSize = 20;
  currentPage = 0;
  canLoadMore = true;

  constructor(private inventarioService: InventarioService) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private loadData() {
    this.allPrendas = this.inventarioService.getPrendas();
    this.filterItems();
  }

  loadMoreData(event?: InfiniteScrollCustomEvent) {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const newItems = this.filteredPrendas.slice(start, end);

    this.displayedPrendas = [...this.displayedPrendas, ...newItems];
    this.currentPage++;

    this.canLoadMore = end < this.filteredPrendas.length;

    if (event) {
      event.target.complete();
      event.target.disabled = !this.canLoadMore;
    }
  }

  calcularValorTotal(): number {
    return this.inventarioService.calcularValorTotal();
  }

  sortItems() {
    this.applySorting();
    this.currentPage = 0;
    this.displayedPrendas = [];
    this.loadMoreData();
  }

  filterItems() {
    this.currentPage = 0;
    this.filteredPrendas = this.allPrendas.filter(prenda =>
      prenda.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      prenda.disenador.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.applySorting();
    this.displayedPrendas = [];
    this.loadMoreData();
  }

  private applySorting() {
    switch (this.sortOrder) {
      case 'asc':
        this.filteredPrendas.sort((a, b) => a.anoColeccion - b.anoColeccion);
        break;
      case 'desc':
        this.filteredPrendas.sort((a, b) => b.anoColeccion - a.anoColeccion);
        break;
      default:
        this.filteredPrendas = [...this.filteredPrendas];
    }
  }

  eliminarPrenda(id: number) {
    // Eliminar del servicio
    this.inventarioService.eliminarPrenda(id);

    // Actualizar las listas
    this.allPrendas = this.allPrendas.filter(prenda => prenda.id !== id);
    this.filterItems();
  }
}
