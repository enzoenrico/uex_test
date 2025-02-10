export type Tlocation = {
	// used mostly for finding points in the map component
	lat: number
	lng: number
}

export interface CreateContactPayload {
	userId: string;
	contact: {
		name: string;
	};
	address: {
		cep: number;
		streetName: string;
		streetNumber?: number;
		county: string;
		state?: string;
		Lat: number;
		Lng: number;
		countryCode: string;
		complement?: string;
	};
}