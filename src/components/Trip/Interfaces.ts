interface Trip {
    id: string;
    title: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    budget?: number;
    attendees?: string[];
}

export type { Trip };
