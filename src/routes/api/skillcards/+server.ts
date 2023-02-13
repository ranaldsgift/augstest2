import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { RequestHandler } from './$types';
import { error } from "@sveltejs/kit";
import { SkillCard } from '$lib/entities/SkillCard';

export const GET: RequestHandler = async (event) => {
    const userId = event.url.searchParams.get('userId');

    let data = null;
    try {
        data = await SkillCard.createQueryBuilder('skillcard')
            .leftJoinAndSelect("skillcard.image", "image")
            .leftJoinAndSelect("skillcard.user", "user")
            .where("user.id = :userId", { userId: userId }).andWhere("skillcard.heroId is NULL").getMany();
    }
    catch (err) {
        console.error(err);
        throw error(500, "Internal Server Error");
    }
    const jsonData = DataHelper.serialize(data);
    return new Response(jsonData);
};