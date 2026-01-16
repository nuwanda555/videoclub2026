
import { supabase } from './supabase';
import { Movie, Customer, Rental } from '../types';

export const api = {
    async getMovies(): Promise<Movie[]> {
        const { data, error } = await supabase
            .from('movies')
            .select('*');

        if (error) throw error;

        return data.map((m: any) => ({
            ...m,
            coverUrl: m.cover_url
        }));
    },

    async getCustomers(): Promise<Customer[]> {
        const { data, error } = await supabase
            .from('customers')
            .select('*');

        if (error) throw error;

        return data.map((c: any) => ({
            ...c,
            memberSince: c.member_since,
            totalLoans: c.total_loans
        }));
    },

    async getRentals(): Promise<Rental[]> {
        const { data, error } = await supabase
            .from('rentals')
            .select('*');

        if (error) throw error;

        return data.map((r: any) => ({
            ...r,
            customerId: r.customer_id,
            movieId: r.movie_id,
            loanDate: r.loan_date,
            dueDate: r.due_date,
            returnDate: r.return_date,
            lateFee: r.late_fee
        }));
    }
};
