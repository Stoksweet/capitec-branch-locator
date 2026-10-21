export interface Attribute {
    id: number;
    value: string;
    icon: string;
}

export interface OperatingHours {
    has_operating_hours: boolean;
    operating_time_is_open: boolean;
    operating_time_open: string;
    operating_time_closed: string;
    operating_time_string: string;
}

export interface Branch {
    nearest: boolean;
    local_page_url: string;
    slug: string;
    name: string;
    brand: string;
    distance: number;
    storeCode: string;
    primaryNumber: string;
    address: string;
    latitude: string;
    longitude: string;
    country: string;
    isServiceArea: boolean;
    attributes: Attribute[];
    filteredAttributes: string;
    trading_status: string;
    date_opened: string | null;
    date_closed: string | null;
    date_reopened: string | null;
    specialOperatingHours: any[];
    operating_hours: OperatingHours;
    googleDirectionsLink: string;

    // Computed Google Maps LatLngLiteral for map binding
    position?: { lat: number, lng: number };
}