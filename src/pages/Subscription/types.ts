export type PersonalData = {
    name: string;
    age: number;
    phoneNumber: string;
    city: string;
    centroEspirita: string;
    badgeName: string;
    emergencyContact?: string;
    minorsGuardianName?: string;
    address: string;
    imageConsent: boolean;
    regulationsConsent: boolean;
};

export type HealthData = {
    restricaoAlimentar: string;
    restricaoMedica: string;
    cuidadosEspeciais: string;
};
