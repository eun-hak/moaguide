export interface ICowProductDetail {
  productId: string;
  category: string;
  platform: string;
  title: string;
  name: string;
  recruitmentPrice: number;
  recruitmentRate: number;
  totalPrice: number;
  recruitmentDate: string;
  minInvestment: number;
  link: string;
  bookmark: boolean;
}

export interface ICowProductProfitDetail {
  publish: {
    name: string;
    type: string;
    piece: number;
    basePrice: number;
    totalPrice: string;
    recruitingType: string;
    rightsStructure: string;
    revenueStructure: string;
    subscriptionDate: string;
    paymentDate: string;
    allocationDate: string;
    criteriaDate: string;
  };
  farm: {
    certificationNumber: string;
    certificationAgency: string;
    manager: string;
    certifiedHeads: string;
    cattleBreed: string;
    initialDate: string;
  };
}

export interface ICowPrice {
  day: string;
  value: number;
}

export interface ICowProductPrice {
  name: string;
  object: ICowPrice[];
}

export interface ICowMarketPrice {
  name: string;
  object: ICowPrice[];
}
