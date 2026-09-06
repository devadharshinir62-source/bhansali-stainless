export interface FlangeType {
  id: string;
  name: string;
  code: string;
  description: string;
  features: string[];
  standards: string;
  commonUses: string;
}

export interface FlangeGrade {
  id: string;
  name: string;
  code: string;
  standard: string;
  tagline: string;
  description: string;
  characteristics: string[];
  chemicalHighlights: { element: string; range: string }[];
  mechanicalProperties: { property: string; value: string }[];
  suitableApplications: string[];
  recommendedFor: string;
}

export interface SpecificationItem {
  category: string;
  parameter: string;
  specification: string;
  notes?: string;
  isPlaceholder?: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  scope: string;
  complianceDoc: string;
  disclaimer: string;
  isPlaceholder: boolean;
}

export interface ExportPort {
  country: string;
  flag: string;
  ports: string[];
  transitTimeEstimate: string;
  documentation: string[];
}

export interface ValueProposition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface EnquiryFormData {
  fullName: string;
  businessEmail: string;
  phone: string;
  companyName: string;
  destinationCountry: string;
  productGrade: string;
  flangeType: string;
  pressureClass: string;
  sizeRange: string;
  estimatedQuantity: string;
  projectTimeline: string;
  additionalSpecifications: string;
}

export interface EnquirySubmissionResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
  submittedAt?: string;
  data?: EnquiryFormData;
}
