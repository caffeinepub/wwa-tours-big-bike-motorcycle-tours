import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ItineraryDay {
    day: bigint;
    title: string;
    description: string;
}
export interface Tour {
    id: bigint;
    destination: Destination;
    duration: bigint;
    difficulty: Difficulty;
    name: string;
    tourDates: Array<string>;
    isActive: boolean;
    maxGroupSize: bigint;
    highlights: Array<string>;
    shortDescription: string;
    isFeatured: boolean;
    fullDescription: string;
    priceUSD: bigint;
    itinerary: Array<ItineraryDay>;
    route: string;
}
export interface InquiryInput {
    email: string;
    tourInterest?: string;
    message: string;
    chatId: string;
    phone: string;
    lastName: string;
    firstName: string;
}
export interface Inquiry {
    id: bigint;
    submittedAt: string;
    email: string;
    tourInterest?: string;
    message: string;
    chatId: string;
    phone: string;
    lastName: string;
    firstName: string;
}
export interface Testimonial {
    id: bigint;
    country: string;
    date: string;
    name: string;
    text: string;
    tourName: string;
    rating: bigint;
}
export enum Destination {
    usa = "usa",
    europe = "europe",
    asia = "asia",
    thailand = "thailand"
}
export enum Difficulty {
    easy = "easy",
    challenging = "challenging",
    expert = "expert",
    moderate = "moderate"
}
export interface backendInterface {
    getFeaturedTours(): Promise<Array<Tour>>;
    getInquiries(): Promise<Array<Inquiry>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getTour(id: bigint): Promise<Tour>;
    getTours(): Promise<Array<Tour>>;
    getToursByDestination(destination: Destination): Promise<Array<Tour>>;
    submitInquiry(input: InquiryInput): Promise<bigint>;
}
