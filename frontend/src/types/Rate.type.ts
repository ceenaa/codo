import { user } from '../types/User.type';

export type rate = {
	date_time: string;
	source: user;
	destination: user;
	rate: number;
};
