export interface Country {
    name: {
        common: string;
        official: string;
    };
    population?: number;
    continents?: string[];
    capital?: string[];
    flags: {
        svg: string;
    };
    subregion?: string;
    tld?: string[];
    currencies?: {
        [key: string]: { name: string };
    };
    languages?: {
        [key: string]: string;
    };
    borders?: string[];
}


