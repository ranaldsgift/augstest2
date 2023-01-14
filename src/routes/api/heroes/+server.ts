import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { RequestHandler } from './$types';
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {

    let data = null;
    try {
        data = await Hero.find();
    }
    catch (err) {
        console.error(err);
        throw error(500, "Internal Server Error");
    }

    const jsonData = DataHelper.serialize(data);
    return new Response(jsonData);
};