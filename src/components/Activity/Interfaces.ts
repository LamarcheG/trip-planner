export enum ActivityCategory {
    Business = 'Business',
    Entertainment = 'Entertainment',
    Food = 'Food',
    Drinks = 'Drinks',
    Culture = 'Culture',
    Music = 'Music',
    Health = 'Health',
    Hobbies = 'Hobbies',
    Shopping = 'Shopping',
    Sports = 'Sports',
    Travel = 'Travel'
}
interface Activity {
    id: string;
    title: string;
    startDate?: Date;
    endDate?: Date;
    description: string;
    category?: ActivityCategory;
    address?: string;
    cost?: number;
    attendees?: string[];
}
export type { Activity };
