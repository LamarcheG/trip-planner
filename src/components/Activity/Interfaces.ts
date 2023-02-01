enum ActivityCategory {
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
