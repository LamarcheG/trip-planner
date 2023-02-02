interface Trip {
    title: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    budget?: number;
    attendees?: string[];
}

export type { Trip };
