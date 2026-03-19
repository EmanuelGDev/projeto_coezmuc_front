export interface PersonalData {
  name: string
  age: number
  phoneNumber: string
  minorsGuardianName: string
  city: string
  centroEspirita: string
  badgeName: string
  emergencyContact: string
  address: string
  imageConsent: boolean
  regulationsConsent: boolean
}

export interface HealthData {
  restricaoAlimentar: string
  restricaoMedica: string
  cuidadosEspeciais: string
}

export interface PaymentData {
  fullValue: number
  paidValue: number
  paymentStatus: 'pending' | 'paid' | 'partial'
}

export interface SubscriptionStatus {
  subscriptionStatus: 'pending' | 'active' | 'cancelled'
}

export interface Subscription {
  _id: string
  userId: {
    _id: string
    username: string
  }
  personalData: PersonalData
  healthData: HealthData
  paymentData: PaymentData
  status: SubscriptionStatus
  createdAt: string
  __v: number
}

export interface UserSubscriptionsResponse {
  data: Subscription[]
}
