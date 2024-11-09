import { Launch } from "./launch.model";

export interface LaunchList {
    count: number;
    next: string;
    previous: string;
    results: Launch[];
}