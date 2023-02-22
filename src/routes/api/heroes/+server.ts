import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {

    let offset = Number(event.url.searchParams.get('offset'));
    let limit = Number(event.url.searchParams.get('limit'));
    let userId = event.url.searchParams.get('userId');
    let userFavorites = event.url.searchParams.get('userFavorites');
    let search = event.url.searchParams.get('search');
    let sort = event.url.searchParams.get('sort');
    let asc = event.url.searchParams.get('asc') === "true" ?? false;
    let isDeleted = event.url.searchParams.get('isDeleted') === "true" ?? false;

    let data = null;
    let dataCount = null;
    try {
        let query = Hero.createQueryBuilder('hero')
            .leftJoinAndSelect("hero.user", "user")
            .leftJoinAndSelect("hero.heroImage", "heroImage")
            .leftJoinAndSelect("hero.skillCards", "skillCards")
            .leftJoinAndSelect("hero.abilities", "abilities")
            .leftJoinAndSelect("hero.iconImage", "iconImage")
            .leftJoinAndSelect("hero.actionDice", "actionDice")
            .leftJoinAndSelect("hero.userFavorites", "userFavorites")
            .andWhere(`hero.isDeleted = :isDeleted`, { isDeleted: isDeleted })

        if (userId) {
            query = query
                .andWhere(`user.id = :userId`, { userId: userId })
        }


        if (search) {
            query = query
                .andWhere(`CONCAT_WS(' ', hero.name, hero.keywords, user.userName, actionDice.dice, hero.theme, abilities.name, abilities.effect) ILIKE :search`, { search: `%${search}%` })
        }

        if (userFavorites) {
            query = query
                .andWhere(`userFavorites.userId = :userFavorites`, { userFavorites: userFavorites })
        }

        if (sort) {
            query = query
                .orderBy(`hero.${sort}`, asc ? 'ASC' : 'DESC')
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
    })
    const jsonData = DataHelper.serialize(data);
    return new Response(response);
};