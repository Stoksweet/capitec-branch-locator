import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  private http = HttpClient;
  private httpClient = inject(HttpClient);

  // MapLibre configuration properties
  center: [number, number] = [22.9375, -30.5595]; 
  zoom: number = 8; 
  mapStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

  branches: any[] = [];
  allBranches: any[] = [];
  selectedBranch: any = null;
  searchQuery: string = '';

  constructor() {}

  ngOnInit() {
    this.loadBranches();
  }

  // Loads branches/stores from the Capitec stores JSON file
  loadBranches() {
    this.httpClient.get<any>('assets/data/capitec-stores.json').subscribe({
      next: (response) => {
        const storesArray = response.stores || [];

        this.allBranches = storesArray.map((branch: any) => ({
          ...branch,
          lngLat: [parseFloat(branch.longitude), parseFloat(branch.latitude)]
        }));

        // Initialize displayed branches
        this.branches = [...this.allBranches];

        if (this.branches.length > 0) {
          const nearest = this.branches.find((b: any) => b.nearest) || this.branches[0];
          this.selectBranch(nearest);
        }
      },
      error: (err) => console.error('Failed to load local branch dataset:', err)
    });
  }

  // 1. Text Search Filtering Logic
  filterBranches() {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.branches = [...this.allBranches];
      return;
    }

    this.branches = this.allBranches.filter((branch: any) => {
      const nameMatch = branch.name?.toLowerCase().includes(query);
      const addressMatch = branch.address?.toLowerCase().includes(query);
      const codeMatch = branch.storeCode?.toLowerCase().includes(query);
      return nameMatch || addressMatch || codeMatch;
    });

    // Automatically select the first match if available
    if (this.branches.length > 0) {
      this.selectBranch(this.branches[0]);
    }
  }

  // 2. "Use My Location" Geolocation Logic
  useMyCurrentLocation() {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by your browser');
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLng = position.coords.longitude;
        const userLat = position.coords.latitude;

        // Center map on user location
        this.center = [userLng, userLat];
        this.zoom = 13;

        // Find the absolute closest branch using Haversine formula calculation
        let closestBranch = null;
        let minDistance = Infinity;

        this.allBranches.forEach((branch) => {
          const dist = this.calculateDistance(userLat, userLng, branch.lngLat[1], branch.lngLat[0]);
          if (dist < minDistance) {
            minDistance = dist;
            closestBranch = branch;
          }
        });

        if (closestBranch) {
          this.selectBranch(closestBranch);
        }
      },
      (error) => {
        console.error('Error obtaining location:', error);
        alert('Unable to retrieve your location. Please check your browser permissions.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Helper function to calculate distance between two coordinates in kilometers
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  selectBranch(branch: any) {
    this.selectedBranch = branch;
    if (branch.lngLat) {
      this.center = branch.lngLat;
      this.zoom = 14; 
    }
  }

  zoomIn() {
    if (this.zoom < 20) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > 3) this.zoom--;
  }
}
