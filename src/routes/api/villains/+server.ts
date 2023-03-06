import { Villain } from '$lib/entities/Villain';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

const villain = new Villain();

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
        let query = Villain.createQueryBuilder('villain')
            .leftJoinAndSelect("villain.user", "user")
            .leftJoinAndSelect("villain.image", "villainImage")
            .leftJoinAndSelect("villain.skillCards", "skillCards")
            .leftJoinAndSelect("villain.competitive", "competitive")
            .leftJoinAndSelect("competitive.abilities", "competitiveAbilities")
            .leftJoinAndSelect("villain.cooperative", "cooperative")
            .leftJoinAndSelect("cooperative.abilities", "cooperativeAbilities")
            .leftJoinAndSelect("villain.iconImage", "iconImage")
            .leftJoinAndSelect("villain.userFavorites", "userFavorites")
            .andWhere(`villain.isDeleted = :isDeleted`, { isDeleted: isDeleted })

        if (userId) {
            query = query
                .andWhere(`user.id = :userId`, { userId: userId })
        }


        if (search) {
            query = query
                .andWhere(`CONCAT_WS(' ', villain.name, villain.keywords, user.userName, villain.theme, competitiveAbilities.name, competitiveAbilities.effect, cooperativeAbilities.name, cooperativeAbilities.effect) ILIKE :search`, { search: `%${search}%` })
        }

        if (userFavorites) {
            query = query
                .andWhere(`userFavorites.userId = :userFavorites`, { userFavorites: userFavorites })
        }

        if (sort && sort in villain) {
            query = query
                .orderBy(`villain.${sort}`, asc ? 'ASC' : 'DESC')
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