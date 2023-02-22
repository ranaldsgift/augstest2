import { DataHelper } from '$lib/helpers/DataHelper';
import type { RequestHandler } from './$types';
import { error } from "@sveltejs/kit";
import { SkillCard } from '$lib/entities/SkillCard';

export const GET: RequestHandler = async ({ url }) => {

    let offset = Number(url.searchParams.get('offset'));
    let limit = Number(url.searchParams.get('limit'));
    let userId = url.searchParams.get('userId');
    let heroId = url.searchParams.get('heroId');
    let search = url.searchParams.get('search');
    let sort = url.searchParams.get('sort');
    let asc = url.searchParams.get('asc') === "true" ?? false;
    let isDeleted = url.searchParams.get('isDeleted') === "true" ?? false;

    let data = null;
    let dataCount = null;
    try {
        let query = SkillCard.createQueryBuilder('skillCard')
            .leftJoinAndSelect("skillCard.user", "user")
            .leftJoinAndSelect("skillCard.image", "image")
            .leftJoinAndSelect("skillCard.hero", "hero")
            .andWhere(`skillCard.isDeleted = :isDeleted`, { isDeleted: isDeleted })

        if (userId) {
            query = query
                .andWhere(`user.id = :userId`, { userId: userId })
        }

        if (search) {
            query = query
                .andWhere(`CONCAT_WS(' ', skillCard.name, skillCard.effect, user.userName, skillCard.theme, skillCard.iconCost, hero.name, hero.theme) ILIKE :search`, { search: `%${search}%` })
        }

        if (heroId) {
            if (!Number(heroId)) {
                if (heroId === 'null') {
                    query = query
                        .andWhere(`hero.id IS NULL`)
                }
            }
            else {
                query = query
                    .andWhere(`hero.id = :heroId`, { heroId: heroId })
            }
        }

        if (sort) {
            if (sort.includes('date')) {
                query = query
                    .orderBy(`skillCard.${sort}`, asc ? 'ASC' : 'DESC')
            }
            else {
                query = query
                    .addSelect(`LOWER(skillCard.${sort})`, 'sort')
                    .orderBy('sort', asc ? 'ASC' : 'DESC')
            }
        }

        data = await query
            .skip(offset * limit)
            .take(limit)
            .getMany();

        dataCount = await query
            .getCount();
    }
    catch (err) {
        console.error(err);
        throw error(500, "Internal Server Error");
    }
    
    const response = DataHelper.serialize({
        items: data,
        count: dataCount
    });
    return  new Response(response);
};