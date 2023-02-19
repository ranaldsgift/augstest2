import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { RequestHandler } from './$types';
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    let data = null;
    try {
        data = await Hero.createQueryBuilder('hero').select("distinct on (unnest(hero.keywords)) unnest(hero.keywords) as keyword").getRawMany();
    }
    catch (err) {
        console.error(err);
        throw error(500, "Internal Server Error");
    }
    const keywords = data.map((item: any) => item.keyword);
    const jsonData = DataHelper.serialize({ items: keywords, count: keywords.length });
    return new Response(jsonData);
};