export interface FuneralScheme {
  id: string;
  name: string;
  description: string;
  oldPrice: number;
  newPrice: number;
  joiningFee: string;
  coffinDetails: string;
  transportDetails: string[];
  features: string[];
  outsideGauteng?: boolean;
}

export interface BranchOffice {
  id: string;
  name: string;
  region: 'South Africa' | 'Zimbabwe';
  address: string;
  phones: string[];
  email?: string;
  hours?: string;
  locationDetails?: string;
}

export interface FuneralProduct {
  id: string;
  name: string;
  category: 'Casket' | 'Coffin';
  image: string;
  openImage?: string;
  description: string;
  features: string[];
}
